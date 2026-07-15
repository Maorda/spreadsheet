import { Module, DynamicModule, Global, Provider, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SHEET_ODM_OPTIONS, SpreadsheetAuthModule } from '@spreadsheet/auth';

// Interfaces, Constantes y Tokens
import {
  SheetOdmModuleOptions, SheetOdmRootOptions,
  SheetOdmRootAsyncOptions
} from './interfaces/sheet-odm-options.interface';
import { POSTGRES_TOKEN } from './shared/constants/constants';
import { PIPELINE_STAGE, DATA_TRANSFORM_OPERATOR, FILTER_OPERATOR } from './stages/pipeline.constants';

// Núcleo del Sistema (Core)
import { DataSourceManager } from './core/data-source-manager';
import { MetadataRegistry } from './JoinSheetTabs/metadata.registry';
import { GasTelemetryInterceptor } from './core/interceptors/gas-telemetry.interceptor';
import { SheetDocumentHydrator } from './core/base/sheet-document-hydrator';
import { SheetDataTransformer } from './core/base/sheetDataTransformer';
import { PopulateEngine } from './core/engine/populate.engine';
import { QueryEngine } from './core/query/query.engine';
import { MutationEngine } from './core/engine/mutationEngine';

// Pipeline Stages
import { MatchStage, ProjectStage, AddFieldsStage } from './stages/filtrado_y_transformacion';
import { LimitStage, SkipStage, SortStage } from './stages/orden_y_paginacion';
import { ExpressionEngine } from './stages/expression.engine';

// Operadores
import {
  AggregateOperator, ConcatOperator, DateAddOperator, DateTransformer, IfOperator,
  IncOperator, MathOperator, MinMaxOperator, MultiplyOperator,
  RoundOperator, TimeDiffOperator, TrimOperator, UpperOperator
} from './stages/transform.operators';
import { EqOperator, ExistsOperator, GteOperator, GtOperator, InOperator, LteOperator, LtOperator, NeOperator, NinOperator, RegexOperator } from './stages/filter.operators';

// Infraestructura y Repositorios
import { PostgresProvider } from './adapters/postgres.provider';
import { GoogleHealthService } from './adapters/health/google-sheet-health.service';
import { SheetDataGateway } from './infrastructure/sheet-api/sheet-data.gateway';
import { GasQueryGateway } from './infrastructure/gas-web-app/gas-query.gateway';
import { InfrastructureProvisioner } from './infrastructure/InfrastructureProvisioner';

// Submódulos Externos
import { OutboxModule } from './core/outbox/outbox.module';
import { UowModule } from './core/uow/uow.module';
import { OdmDiagnosticsService } from './core/diagnostic/odm-diagnostics.service';
import { OdmDiagnosticsController } from './core/diagnostic/odm-diagnostics.controller';
import { SheetsRepositoryFactory } from './core/repository/sheets-repository.factory';
import { SheetsRepository } from './core/repository/sheets.repository';
import { RepositoryCoreFacade } from './core/repository/repository-core.facade';
import { SheetCacheModule } from './core/cache/cache.module';
import { createModel } from './core/model/model.factory';
import { SheetOdmSerializeInterceptor } from './core/interceptors/sheet-odm-serialize.interceptor';
import { ModelRegistry } from './core/model/model.registry';
import { PipelineOrchestrator } from './stages/pipeline.registry';
import { AggregationBuilder } from './stages/aggregation.builder';
import { AggregationFactory } from './stages/interfaces/aggregation.factory';
import { JoinSheetTabsModule } from './JoinSheetTabs/JoinSheetTabsModule';


// ============================================================================
// AGRUPACIONES DE PROVIDERS
// ============================================================================

const CORE_SHARED_SERVICES: Provider[] = [
  RepositoryCoreFacade,
  DataSourceManager,
  MetadataRegistry,
  OdmDiagnosticsService,
  SheetsRepositoryFactory,
  ExpressionEngine,
  QueryEngine,
  MutationEngine,
  SheetDocumentHydrator,
  SheetDataGateway,
  InfrastructureProvisioner,
  PipelineOrchestrator,
  AggregationBuilder,
  AggregationFactory,
];

const INTERNAL_SERVICES: Provider[] = [

  GasQueryGateway,
  GoogleHealthService,
  SheetDataTransformer,
  PopulateEngine,
  { provide: APP_INTERCEPTOR, useClass: GasTelemetryInterceptor },
  { provide: APP_INTERCEPTOR, useClass: SheetOdmSerializeInterceptor },
];

const TRANSFORM_OPERATORS = [
  ConcatOperator, IfOperator, MultiplyOperator, IncOperator,
  MinMaxOperator, RoundOperator, MathOperator, UpperOperator,
  TrimOperator, DateAddOperator, TimeDiffOperator, AggregateOperator
];

const FILTER_OPERATORS = [EqOperator, GtOperator, InOperator, NinOperator, NeOperator, GteOperator, LtOperator, LteOperator, RegexOperator, ExistsOperator, DateTransformer];

const PIPELINE_STAGES = [
  MatchStage, SortStage, LimitStage, SkipStage, ProjectStage, AddFieldsStage
];

const ALL_COMMON_PROVIDERS: Provider[] = [
  ...INTERNAL_SERVICES,
  ...CORE_SHARED_SERVICES,
  ...TRANSFORM_OPERATORS,
  ...FILTER_OPERATORS,
  ...PIPELINE_STAGES,
  {
    provide: DATA_TRANSFORM_OPERATOR,
    useFactory: (...operators: any[]) => operators,
    inject: TRANSFORM_OPERATORS,
  },
  {
    provide: FILTER_OPERATOR,
    useFactory: (...operators: any[]) => operators,
    inject: FILTER_OPERATORS,
  },
  {
    provide: PIPELINE_STAGE,
    useFactory: (...stages: any[]) => stages,
    inject: PIPELINE_STAGES,
  },
];

@Global()
@Module({
  imports: [HttpModule],
})
export class SheetOdmModule implements OnApplicationBootstrap {
  private readonly logger = new Logger('SheetOdm');
  private static hasBootstrapped = false;

  constructor(private readonly provisioner: InfrastructureProvisioner) { }

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'test' || SheetOdmModule.hasBootstrapped) {
      return;
    }

    SheetOdmModule.hasBootstrapped = true;
    this.logger.log('--- 🚀 [SheetODM] Iniciando sincronización de infraestructura ---');

    try {
      await this.provisioner.syncSchema();
      this.logger.log('✅ [SheetODM] Infraestructura lista.');
    } catch (err: any) {
      this.logger.error(`❌ [SheetODM] Error de inicialización: ${err.message}`);
    }
  }

  // ========================================================================
  // CONFIGURACIÓN ASÍNCRONA (Root Async)
  // ========================================================================

  static forRootAsync(options: SheetOdmRootAsyncOptions): DynamicModule {
    if (!options.useFactory) {
      throw new Error('El método [useFactory] es requerido en forRootAsync para SheetOdmModule.');
    }

    // 💡 SOLUCIÓN AL TS(2722): Extraemos la función a una constante local.
    // Esto asegura a TypeScript que la función no cambiará a 'undefined' dentro de los closures de abajo.
    const factory = options.useFactory;

    return {
      global: true,
      module: SheetOdmModule,
      imports: [
        SheetCacheModule,
        UowModule,
        JoinSheetTabsModule,
        ...(options.imports || []),

        SpreadsheetAuthModule.registerAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: async (...args: any[]) => {
            const config = await factory(...args);
            return config.auth; // ✅ TypeScript ahora sabe perfectamente que config es SheetOdmRootOptions
          },
        }),

        OutboxModule.registerAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: async (...args: any[]) => {
            const config = await factory(...args);
            return config.odm;
          },
        }),
      ],
      controllers: [OdmDiagnosticsController],
      providers: [
        {
          provide: 'DATABASE_OPTIONS',
          useFactory: async (...args: any[]) => {
            const config = await factory(...args);
            return config.odm;
          },
          inject: options.inject || []
        },
        {
          provide: SHEET_ODM_OPTIONS,
          useFactory: async (...args: any[]) => {
            const config = await factory(...args);
            return config.odm; // Se entrega solo la parte ODM que tus componentes Core esperan
          },
          inject: options.inject || []
        },
        {
          provide: PostgresProvider,
          useFactory: (opts: SheetOdmModuleOptions) => new PostgresProvider(opts),
          inject: [SHEET_ODM_OPTIONS],
        },
        { provide: POSTGRES_TOKEN, useExisting: PostgresProvider },
        ...ALL_COMMON_PROVIDERS,
      ],
      exports: [
        UowModule,
        OutboxModule,
        PostgresProvider,
        POSTGRES_TOKEN,
        SheetCacheModule,
        JoinSheetTabsModule,
        SpreadsheetAuthModule,
        ...CORE_SHARED_SERVICES,
      ],
    };
  }

  // ========================================================================
  // CONFIGURACIÓN SÍNCRONA (Root Sync)
  // ========================================================================

  static forRoot(options: SheetOdmRootOptions): DynamicModule {
    return {
      global: true,
      module: SheetOdmModule,
      imports: [
        SpreadsheetAuthModule.register(options.auth),
        OutboxModule.register(options.odm),
        SheetCacheModule,
        UowModule,
        JoinSheetTabsModule,
      ],
      controllers: [OdmDiagnosticsController],
      providers: [
        { provide: 'DATABASE_OPTIONS', useValue: options.odm },
        { provide: SHEET_ODM_OPTIONS, useValue: options.odm }, // Ajustado para inyectar solo la parte de ODM
        {
          provide: PostgresProvider,
          useFactory: (opts: SheetOdmModuleOptions) => new PostgresProvider(opts),
          inject: [SHEET_ODM_OPTIONS],
        },
        { provide: POSTGRES_TOKEN, useExisting: PostgresProvider },
        ...ALL_COMMON_PROVIDERS,
      ],
      exports: [
        UowModule,
        OutboxModule,
        PostgresProvider,
        POSTGRES_TOKEN,
        SheetCacheModule,
        JoinSheetTabsModule,
        SpreadsheetAuthModule,
        ...CORE_SHARED_SERVICES,
      ],
    };
  }

  // ========================================================================
  // REGISTRO DE ENTIDADES (Feature)
  // ========================================================================

  static forFeature(entities: Function[]): DynamicModule {
    const providers: Provider[] = entities.flatMap((entity) => {
      MetadataRegistry.register(entity as any);

      const repositoryToken = `SheetsRepository_${entity.name}`;

      const repositoryProvider: Provider = {
        provide: repositoryToken,
        useFactory: (coreFacade: RepositoryCoreFacade) =>
          new SheetsRepository(entity as any, coreFacade),
        inject: [RepositoryCoreFacade],
      };

      const modelProvider: Provider = {
        provide: `${entity.name}Model`,
        useFactory: (repo: SheetsRepository<any>) => {
          const model = createModel(entity as any, repo);
          ModelRegistry.register(entity.name, model);
          return model;
        },
        inject: [repositoryToken],
      };

      return [repositoryProvider, modelProvider];
    });

    return {
      module: SheetOdmModule,
      providers: providers,
      exports: providers,
    };
  }
}