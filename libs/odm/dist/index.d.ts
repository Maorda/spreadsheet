import { ModuleMetadata, Type, OnApplicationBootstrap, DynamicModule, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { AuthModuleOptions, GoogleClientProvider } from '@spreadsheet/auth';
import { QueryResultRow, QueryResult, PoolClient } from 'pg';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';

interface SheetOdmRootOptions {
    auth: AuthModuleOptions;
    odm: SheetOdmModuleOptions;
}
interface SheetOdmRootAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<SheetOdmRootOptions> | SheetOdmRootOptions;
    inject?: any[];
    useClass?: Type<any>;
    useExisting?: Type<any>;
}
declare const CONNECTION_STABILITY: {
    STABLE: number;
    UNSTABLE: number;
    CRITICAL: number;
};
declare class PostgresConfig {
    host: string;
    port: number;
    username: string;
    password?: string;
    database: string;
    ssl?: boolean;
}
declare abstract class SheetOdmModuleOptions {
    outboxRetentionInterval?: string;
    googleDriveBaseFolderId: string;
    spreadsheetId?: string;
    checkConnectionOnBoot?: boolean;
    webAppUrl: string;
    apiKey: string;
    timeout?: number;
    timezone?: string;
    formatDates?: boolean;
    outboxPollingInterval?: number;
    postgres: PostgresConfig;
}
interface SheetOdmModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<SheetOdmModuleOptions> | SheetOdmModuleOptions;
    inject?: any[];
    useClass?: Type<SheetOdmModuleOptionsFactory>;
    useExisting?: Type<SheetOdmModuleOptionsFactory>;
}
interface SheetOdmModuleOptionsFactory {
    createSheetOdmOptions(): Promise<SheetOdmModuleOptions> | SheetOdmModuleOptions;
}

interface ColumnOptions {
    name?: string;
    type?: 'string' | 'number' | 'boolean' | 'date' | 'currency' | 'json' | 'array' | any;
    required?: boolean;
    default?: any;
    isDeleteControl?: boolean;
    isAutoIncrement?: boolean;
    generated?: 'uuid' | 'short-id' | 'increment';
    validation?: Record<string, any>;
    index?: boolean;
}

interface ReferenceOptions {
    joinColumn: string;
    required?: boolean;
    onDelete?: 'CASCADE' | 'SET_NULL' | 'RESTRICT';
}
interface SubCollectionOptions {
    onDelete?: 'CASCADE' | 'SET_NULL' | 'RESTRICT';
    joinColumn?: string;
    localField?: string;
}

type ClassType<T = any> = new (...args: any[]) => T;

interface TableOptions {
    dto: ClassType<any>;
    spreadsheetId?: string;
}

interface VirtualOptions {
    group: string;
}

type CompiledRelation = {
    propertyName: string;
    isMany: false;
    type: 'reference';
    targetEntity: () => ClassType<any>;
    joinColumn: string;
    required: boolean;
    onDelete: 'CASCADE' | 'SET_NULL' | 'RESTRICT';
    rawOptions: ReferenceOptions;
} | {
    propertyName: string;
    isMany: true;
    type: 'subcollection';
    targetEntity: () => ClassType<any>;
    joinColumn?: string;
    localField?: string;
    onDelete: 'CASCADE' | 'SET_NULL' | 'RESTRICT';
    rawOptions: SubCollectionOptions;
};
interface EntitySchema {
    sheetName: string;
    primaryKey: string;
    primaryKeyColumnName: string;
    columns: Record<string, ColumnOptions>;
    columnList: string[];
    deleteControl: string | null;
    versionField: string | null;
    relations: Record<string, CompiledRelation>;
    virtuals: any[];
}
interface CleanJoinConfig {
    targetEntity: ClassType<any>;
    foreignKey: string;
    localField: string;
    isMany: boolean;
}
declare class MetadataRegistry {
    private static entities;
    private relations;
    private readonly logger;
    private readonly schemaCache;
    private readonly nameIndex;
    private readonly sheetIndex;
    static register(target: ClassType<any>): void;
    static getAllRegisteredEntities(): ClassType<any>[];
    getJoinConfig<T extends object>(entityClass: ClassType<T>, propertyName: string): CleanJoinConfig | undefined;
    getSchema(entityClass: ClassType<any>): EntitySchema;
    getPrimaryKeyField<T extends object>(entityClass: ClassType<T>): string;
    getPrimaryKeyColumnName<T extends object>(entityClass: ClassType<T>): string;
    getColumnDetails(entityClass: ClassType<any>): Record<string, ColumnOptions>;
    getColumnMap(entityClass: ClassType<any>): Record<string, number>;
    getDeleteControlProperty<T extends object>(entityClass: ClassType<T>): string | null;
    getRelationsList<T extends object>(entityClass: ClassType<T>): string[];
    getCompiledRelations<T extends object>(entityClass: ClassType<T>): CompiledRelation[];
    getColumnList<T extends object>(entityClass: ClassType<T>): string[];
    getVersionField<T extends object>(entityClass: ClassType<T>): string | null;
    getColumnOptions<T extends object>(entityClass: ClassType<T>, path: string): ColumnOptions | undefined;
    private resolveDeepMetadata;
    getRelationOptions(entityClass: ClassType<any>, relationName: string): CompiledRelation | undefined;
    getEntityBySheetName(sheetName: string): ClassType<any> | undefined;
    getEntityByName(className: string): ClassType<any> | undefined;
    getColumnNamesForGas<T extends object>(entityClass: ClassType<T>): string[];
    private compileSchema;
    static registerEntity(entity: Function): void;
    serialize<T extends object>(entity: T, entityClass: ClassType<T>): any[];
    mapRawToEntity<T>(rawData: any, entityClass: ClassType<T>): Partial<T>;
    private normalizeValue;
    getExpectedHeadersForGas<T extends object>(entityClass: ClassType<T>): string[];
    getDatabaseColumnName(entityClass: ClassType<any>, propertyName: string): string;
}

interface ISheetWriteDriver {
    createSheet(title: string): Promise<any>;
    writeHeaders(sheetName: string, headers: string[]): Promise<void>;
    appendRow(sheetName: string, row: any[]): Promise<number>;
    appendRows(sheetName: string, rows: any[][]): Promise<number[]>;
    updateRow(sheetName: string, rowNumber: number, values: any[]): Promise<number>;
    clearRow(sheetName: string, rowNumber: number): Promise<void>;
    batchUpdateValues(data: {
        range: string;
        values: any[][];
    }[]): Promise<void>;
    batchClearValues(ranges: string[]): Promise<void>;
    getExistingSheetTitles(): Promise<string[]>;
    getRange(range: string): Promise<any[][]>;
    getRowData(sheetName: string, rowNumber: number): Promise<any[]>;
    getBoundaries(sheetName: string): Promise<{
        lastRow: number;
        lastColumn: number;
    }>;
}
declare class SheetDataGateway implements ISheetWriteDriver {
    private readonly auth;
    private readonly options;
    private readonly metadataRegistry;
    private readonly logger;
    private readonly spreadsheetId;
    constructor(auth: GoogleClientProvider, options: SheetOdmModuleOptions, metadataRegistry: MetadataRegistry);
    createSheet(title: string): Promise<any>;
    writeHeaders(sheetName: string, headers: string[]): Promise<void>;
    appendRow(sheetName: string, row: any[]): Promise<number>;
    appendRows(sheetName: string, rows: any[][]): Promise<number[]>;
    getExistingSheetTitles(): Promise<string[]>;
    getRange(range: string): Promise<any[][]>;
    updateRow(sheetName: string, rowNumber: number, values: any[]): Promise<number>;
    clearRow(sheetName: string, rowNumber: number): Promise<void>;
    getRowData(sheetName: string, rowNumber: number): Promise<any[]>;
    getDocId<T extends object>(entityClass: ClassType<T>, rowData: any[]): any;
    batchUpdateValues(data: {
        range: string;
        values: any[][];
    }[]): Promise<void>;
    batchClearValues(ranges: string[]): Promise<void>;
    getBoundaries(sheetName: string): Promise<{
        lastRow: number;
        lastColumn: number;
    }>;
}

declare class InfrastructureProvisioner {
    private readonly gateway;
    private readonly registry;
    private readonly logger;
    constructor(gateway: SheetDataGateway, registry: MetadataRegistry);
    syncSchema(): Promise<void>;
    private syncConfigSheet;
    private provisionNewSheet;
    private migrateExistingSheet;
    private validateSchemaConsistency;
    private getHeadersForEntity;
}

declare class SheetOdmModule implements OnApplicationBootstrap {
    private readonly provisioner;
    private readonly logger;
    private static hasBootstrapped;
    constructor(provisioner: InfrastructureProvisioner);
    onApplicationBootstrap(): Promise<void>;
    static forRootAsync(options: SheetOdmRootAsyncOptions): DynamicModule;
    static forRoot(options: SheetOdmRootOptions): DynamicModule;
    static forFeature(entities: Function[]): DynamicModule;
}

declare abstract class IBaseProvider {
    abstract checkHealth(): Promise<{
        status: 'up' | 'down';
        message?: string;
    }>;
    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
}
declare abstract class IGoogleSheetProvider extends IBaseProvider {
}
declare abstract class IProvider {
    abstract checkHealth(): Promise<{
        status: 'up' | 'down';
        latency?: number;
        message?: string;
    }>;
    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
}
declare abstract class IPostgresProvider extends IProvider {
    abstract query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>>;
    abstract getClient(): Promise<PoolClient>;
}

declare class GoogleHealthService implements OnModuleInit {
    private readonly googleSheets;
    protected readonly optionsDatabase: SheetOdmModuleOptions;
    private readonly logger;
    constructor(googleSheets: GoogleClientProvider, optionsDatabase: SheetOdmModuleOptions);
    onModuleInit(): Promise<void>;
    checkConnection(retries?: number): Promise<{
        status: 'up' | 'down';
        latency?: number;
        details?: any;
    }>;
}

interface ISheetReadDriver {
    findOne<T>(sheetName: string, column: string, value: any): Promise<T | null>;
    findMany<T>(sheetName: string, column: string, value: any): Promise<T[]>;
    find<T>(sheetName: string): Promise<T[]>;
}
declare class GasQueryGateway implements ISheetReadDriver {
    private readonly httpService;
    private readonly pg;
    private readonly options;
    private readonly logger;
    private readonly apiKey;
    private readonly apiUrl;
    private readonly spreadsheetId;
    constructor(httpService: HttpService, pg: IPostgresProvider, options: SheetOdmModuleOptions);
    private executeGasQuery;
    findOne<T>(sheetName: string, column: string, value: any): Promise<T | null>;
    findMany<T>(sheetName: string, column: string, value: any): Promise<T[]>;
    find<T>(sheetName: string): Promise<T[]>;
    batchCommit<T = any>(sheetName: string, batchData: {
        inserts: any[][];
        updates: {
            row: number;
            values: any[];
        }[];
        deletes: number[];
    }): Promise<T>;
    execute<T = any>(action: string, sheetName: string, data?: any): Promise<T>;
}

declare enum OutboxStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
declare enum TypeOp {
    INSERT = "INSERT",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}
interface OutboxEntry {
    id: string;
    entityName: string;
    doc: any;
    operation: TypeOp;
    status: OutboxStatus;
    attempts: number;
    createdAt: Date;
    updatedAt: Date;
    startedAt?: Date;
    finishedAt?: Date;
    error?: string;
    sheetName: string;
    payload: any;
}
declare abstract class OutboxService {
    abstract saveTransaction(entries: OutboxEntry[]): Promise<void>;
}

interface ServiceHealth {
    status: 'up' | 'down';
    latency?: number;
    details?: any;
    message?: string;
}
interface SystemHealthStatus {
    status: 'healthy' | 'degraded' | 'down';
    timestamp: string;
    services: {
        google: ServiceHealth;
        postgres: ServiceHealth;
    };
}
declare class DataSourceManager implements OnApplicationShutdown {
    private readonly googleHealth;
    private readonly postgresProvider;
    private readonly gasQueryGateway;
    private readonly sheetDataGateway;
    private readonly outboxService;
    private readonly metadataRegistry;
    private readonly logger;
    constructor(googleHealth: GoogleHealthService, postgresProvider: IPostgresProvider, gasQueryGateway: GasQueryGateway, sheetDataGateway: SheetDataGateway, outboxService: OutboxService, metadataRegistry: MetadataRegistry);
    onApplicationShutdown(signal?: string): Promise<void>;
    checkAllHealth(): Promise<SystemHealthStatus>;
    readFindAll<T>(sheetName: string): Promise<T[]>;
    readFindOne<T>(sheetName: string, column: string, value: any): Promise<T | null>;
    readFindMany<T>(sheetName: string, column: string, value: any): Promise<T[]>;
    dispatchMutation(entityClass: ClassType<any>, operation: TypeOp, payload: any, rawDoc?: any): Promise<void>;
    get directAdminAccess(): SheetDataGateway;
    executeWithRetry<T>(operation: () => Promise<T>, context?: string, maxRetries?: number, baseDelayMs?: number): Promise<T>;
    private sleep;
}

declare function Table(options: TableOptions): ClassDecorator;
declare function Table(name: string, options: TableOptions): ClassDecorator;

declare function PrimaryKey(): PropertyDecorator;

declare function Column(options?: ColumnOptions): PropertyDecorator;

declare function SubCollection(arg: (() => ClassType<any>) | ClassType<any>, options: SubCollectionOptions): PropertyDecorator;

declare const POSTGRES_TOKEN = "POSTGRES_PROVIDER";
declare const SHEETS_TABLE_NAME: unique symbol;
declare const SHEETS_COLUMN_LIST: unique symbol;
declare const TABLE_COLUMN_KEY: unique symbol;
declare const SHEETS_COLUMN_DETAILS: unique symbol;
declare const SHEETS_PRIMARY_KEY: unique symbol;
declare const SHEETS_DELETE_CONTROL: unique symbol;
declare const SHEETS_RELATIONS_LIST: unique symbol;
declare const SHEETS_ALL_RELATIONS: unique symbol;
declare const SHEETS_VIRTUALS: unique symbol;
declare const SHEETS_SUB_COLLECTIONS: unique symbol;
declare const SHEETS_REPOSITORY_MARKER: unique symbol;
declare const SHEETS_DTO: unique symbol;
declare const ROW_INDEX_SYMBOL: unique symbol;
declare const SHEETS_VIRTUAL_COLUMNS: unique symbol;
declare const SHEETS_VERSION_FIELD: unique symbol;
declare const SHEETS_HOOKS: unique symbol;
declare enum HookType {
    PRE_SAVE = "preSave",
    POST_SAVE = "postSave"
}
declare const SHEET_ODM_MODULE_OPTIONS = "SHEET_ODM_MODULE_OPTIONS";
declare const SHEETS_SPREADSHEET_ID = "sheets:spreadsheet_id";
declare const INTERNAL_REPO: unique symbol;
declare const INTERNAL_NEW: unique symbol;

interface PendingOperation {
    type: TypeOp;
    entityClass: ClassType<any>;
    sheetName: string;
    doc: any;
    pk: string | number;
}
declare class UnitOfWork {
    private readonly outboxService;
    private readonly logger;
    private readonly identityMap;
    private pendingOperations;
    private isTransactional;
    constructor(outboxService: OutboxService);
    private getCompositeKey;
    register(doc: any, pk: string | number, entityClass: ClassType<any>): void;
    get(pk: string | number, entityClass: ClassType<any>): any | undefined;
    getAll(): any[];
    startTransaction(): void;
    queueOperation(operation: PendingOperation): boolean;
    hasActiveTransaction(): boolean;
    getPendingOperations(): PendingOperation[];
    commit(): Promise<void>;
    rollback(): void;
    clear(): void;
    clearByEntity(entityClass: ClassType<any>): void;
}

declare abstract class SheetDocument<T> {
    [key: string]: any;
    [INTERNAL_REPO]: any;
    [INTERNAL_NEW]: boolean;
    constructor(data: T, repository: any, isNew: boolean);
    save(): Promise<this>;
    remove(): Promise<boolean>;
    markAsSaved(rowNumber: number): void;
    get rowNumber(): number | undefined;
    getPrimaryKeyValue(key: keyof T): string | number;
}

interface IQueryStage {
    readonly operator: string;
    execute(data: any[], config: any): Promise<any[]> | any[];
    validate(config: any): void;
}
type PipelineStage = {
    $match: Record<string, any>;
} | {
    $lookup: LookupConfig;
} | {
    $unwind: string | {
        path: string;
        preserveNullAndEmptyArrays?: boolean;
    };
} | {
    $project: Record<string, any>;
} | {
    $addFields: Record<string, any>;
} | {
    $group: GroupConfig;
} | {
    $sort: Record<string, 1 | -1>;
} | {
    $limit: number;
} | {
    $skip: number;
};
interface GroupConfig {
    _id: string | null;
    [key: string]: GroupAccumulator | string | null;
}
interface LookupConfig {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
}
interface GroupAccumulator {
    $sum?: string | number | any;
    $avg?: string | any;
    $min?: string | any;
    $max?: string | any;
    $count?: Record<string, never>;
    $push?: string | any;
}

declare class PipelineOrchestrator {
    private readonly stages;
    private readonly logger;
    private readonly stagesMap;
    constructor(stages: IQueryStage[]);
    executePipeline(data: any[], pipeline: Record<string, any>[]): Promise<any[]>;
}

declare class AggregationBuilder {
    private readonly pipelineOrchestrator;
    private pipeline;
    constructor(pipelineOrchestrator: PipelineOrchestrator);
    match(criteria: Record<string, any>): this;
    lookup(config: LookupConfig): this;
    project(criteria: Record<string, any>): this;
    sort(criteria: Record<string, any>): this;
    group(criteria: Partial<GroupConfig>): this;
    unwind(criteria: string | {
        path: string;
    }): this;
    addFields(criteria: Record<string, any>): this;
    limit(criteria: number): this;
    skip(criteria: number): this;
    getPipeline(): PipelineStage[];
    runStages(data: any[]): Promise<any[]>;
}

type UpdateQuery<T> = {
    [P in keyof T]?: T[P];
} & {
    $set?: Partial<T>;
    $inc?: {
        [P in keyof T]?: number;
    };
    $push?: {
        [key: string]: any;
    };
    $pull?: {
        [key: string]: any;
    };
    $unset?: {
        [P in keyof T]?: boolean | number | string;
    };
};
interface FindOneAndUpdateOptions<T extends object, U = any> extends QueryOptions<T> {
    upsert?: boolean;
    new?: boolean;
    customConstructor?: ConstructorSignature<T, U>;
}
declare const InjectModel: (entity: Function) => PropertyDecorator & ParameterDecorator;
interface PopulateOptions<T = any> {
    path: string;
    select?: string | string[] | Record<string, number | boolean>;
    match?: Record<string, any>;
    limit?: number;
    sort?: {
        field: string;
        order: 'ASC' | 'DESC';
    };
    populate?: string | PopulateOptions | (string | PopulateOptions)[];
}
interface QueryOptions<T = any> {
    populate?: string | string[] | PopulateOptions | PopulateOptions[];
    projection?: Record<keyof T | string, number | boolean>;
    limit?: number;
    offset?: number;
    sort?: {
        field: string;
        order: 'ASC' | 'DESC';
    };
    includeInactive?: boolean;
    skip?: number;
    forceRefresh?: boolean;
    customConstructor?: any;
    lean?: boolean;
}
type ConstructorSignature<T, U> = new (data: T, repo: any, isNew: boolean, ...args: any[]) => U;
type FilterQuery<T = any> = {
    [P in keyof T]?: FieldFilter<T[P]>;
} & {
    $or?: FilterQuery<T>[];
    $and?: FilterQuery<T>[];
    $nor?: FilterQuery<T>[];
} & {
    [key: string]: any;
};
type FieldFilter<T> = T | ComparisonOperators<T>;
type ComparisonOperators<T> = {
    $eq?: T;
    $gt?: T;
    $gte?: T;
    $lt?: T;
    $lte?: T;
    $in?: T[];
    $nin?: T[];
    $ne?: T;
    $exists?: boolean;
    $regex?: string;
};

declare class SheetsRepository<T extends object, U extends SheetDocument<T> = SheetDocument<T>> {
    readonly entityClass: ClassType<T>;
    private readonly logger;
    private readonly sheetName;
    private readonly metadata;
    private readonly dataSource;
    private readonly uow;
    private readonly queryEngine;
    private readonly mutationEngine;
    private readonly populateEngine;
    private readonly cacheManager;
    private readonly aggregationFactory;
    private readonly joinSheetTabsService;
    private documentModelConstructor?;
    constructor(entityClass: ClassType<T>, core: RepositoryCoreFacade);
    bindModel(modelConstructor: any): void;
    private getDocumentConstructor;
    private getCacheKey;
    findOne(filter?: FilterQuery<T>, options?: QueryOptions<T>): Promise<U | null>;
    find(filter?: FilterQuery<T>, options?: QueryOptions<T>): Promise<U[]>;
    findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: FindOneAndUpdateOptions<T, U>): Promise<U | null>;
    aggregate<R = any>(pipeline: any[]): Promise<R[]>;
    private applyRelations;
    save(doc: SheetDocument<T>): Promise<SheetDocument<T>>;
    delete(doc: U): Promise<boolean>;
    create(data: Partial<T>): U;
    private hydrateAndCacheRawResult;
    clearRepositoryCache(): Promise<void>;
    protected fetchRawData(includeInactive?: boolean): Promise<any[]>;
    commitBulk(documents: any[]): Promise<void>;
    private canUseIndexedRead;
    private getPrimaryKeyField;
    private processInserts;
    private processUpdates;
    private processDeletes;
    createAggregation(): AggregationBuilder;
    private syncOptimisticCache;
    private syncEntityCache;
}

declare class SheetDataTransformer {
    castValue(value: any, type?: string, defaultValue?: any, appTimezone?: string): any;
    prepareValueForSheet(value: any, type?: string): any;
    formatValueForSheet(value: any, type?: string): any;
    areEqual(val1: any, val2: any): boolean;
    formatForSheet(value: any, type: string): any;
}

interface HydratorOptions<T extends object, U extends SheetDocument<T>> {
    new?: boolean;
    oldDataFlat?: any;
    customConstructor?: new (data: T, repo: SheetsRepository<T>, isNew: boolean, entityClass?: ClassType<T>, rowNumber?: number, version?: number) => U;
}
declare class SheetDocumentHydrator {
    private readonly transformer;
    private readonly logger;
    constructor(transformer: SheetDataTransformer);
    hydrateAndShield<T extends object, U extends SheetDocument<T> = SheetDocument<T>>(entityClass: ClassType<T>, repository: SheetsRepository<T>, rawData: any, options?: HydratorOptions<T, U>): U;
}

type AggregationPipeline = PipelineStage[];
interface IQueryEngine {
    execute<T>(data: T[], filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
    aggregate<R = any>(data: any[], pipeline: AggregationPipeline): Promise<R[]>;
}
declare class QueryEngine implements IQueryEngine {
    private readonly stages;
    private readonly stageRegistry;
    private readonly logger;
    constructor(stages: IQueryStage[]);
    execute<T>(data: T[], filter: FilterQuery<T>, options?: QueryOptions): Promise<any[]>;
    aggregate<T, R = any>(data: T[], pipeline: AggregationPipeline): Promise<R[]>;
    private validatePipeline;
    private normalizeFilter;
}

declare class MutationEngine {
    private readonly logger;
    mutate<T extends object>(updateQuery: UpdateQuery<T>, currentDoc: Partial<T>): Partial<T>;
    private applySet;
    private applyInc;
    private applyUnset;
    private applyPush;
    private applyPull;
}

declare class PopulateEngine {
    private readonly metadataRegistry;
    private readonly logger;
    constructor(metadataRegistry: MetadataRegistry);
    populate<T extends object, DocType extends object>(documents: DocType[], entityClass: ClassType<T>, populateInput: string | string[]): Promise<DocType[]>;
    private populateLevel;
}

declare class AggregationFactory {
    private readonly orchestrator;
    constructor(orchestrator: PipelineOrchestrator);
    create(): AggregationBuilder;
}

declare class JoinEngine {
    private readonly metadataRegistry;
    private readonly logger;
    constructor(metadataRegistry: MetadataRegistry);
    execute<T extends object>(parents: T[], parentEntityClass: ClassType<T>, propertyName: string, childProjection?: Record<string, number>): Promise<T[]>;
}

declare class JoinSheetTabsService {
    private readonly joinEngine;
    private readonly logger;
    constructor(joinEngine: JoinEngine);
    resolveJoins<T extends object, U extends object = any>(results: U[], entityClass: ClassType<T>, options?: QueryOptions<T>): Promise<U[]>;
    handleCascadeDelete<T extends object, U extends object = any>(doc: U, entityClass: ClassType<T>): Promise<void>;
    private normalizeProjection;
    orchestrate<T extends object>(results: T[], entityClass: ClassType<T>, populatePaths: Set<string>, childProjections: Record<string, Record<string, number>>): Promise<T[]>;
}

declare class RepositoryCoreFacade {
    readonly metadata: MetadataRegistry;
    readonly dataSource: DataSourceManager;
    readonly uow: UnitOfWork;
    readonly hydrator: SheetDocumentHydrator;
    readonly queryEngine: QueryEngine;
    readonly mutationEngine: MutationEngine;
    readonly readGateway: GasQueryGateway;
    readonly gateway: SheetDataGateway;
    readonly transformer: SheetDataTransformer;
    readonly populateEngine: PopulateEngine;
    readonly aggregationBuilder: AggregationBuilder;
    readonly aggregationFactory: AggregationFactory;
    readonly joinSheetTabsService: JoinSheetTabsService;
    readonly cacheManager: Cache;
    constructor(metadata: MetadataRegistry, dataSource: DataSourceManager, uow: UnitOfWork, hydrator: SheetDocumentHydrator, queryEngine: QueryEngine, mutationEngine: MutationEngine, readGateway: GasQueryGateway, gateway: SheetDataGateway, transformer: SheetDataTransformer, populateEngine: PopulateEngine, aggregationBuilder: AggregationBuilder, aggregationFactory: AggregationFactory, joinSheetTabsService: JoinSheetTabsService, cacheManager: Cache);
}

interface OutboxAsyncOptions {
    useFactory: (...args: any[]) => any;
    inject?: any[];
    imports?: any[];
}
declare class OutboxModule {
    static register(options: SheetOdmModuleOptions): DynamicModule;
    static registerAsync(options: OutboxAsyncOptions): DynamicModule;
}

export { CONNECTION_STABILITY, type ClassType, Column, type ColumnOptions, DataSourceManager, type FilterQuery, HookType, IBaseProvider, IGoogleSheetProvider, INTERNAL_NEW, INTERNAL_REPO, IPostgresProvider, IProvider, InjectModel, MetadataRegistry, OutboxModule, POSTGRES_TOKEN, PostgresConfig, PrimaryKey, type QueryOptions, ROW_INDEX_SYMBOL, type ReferenceOptions, RepositoryCoreFacade, SHEETS_ALL_RELATIONS, SHEETS_COLUMN_DETAILS, SHEETS_COLUMN_LIST, SHEETS_DELETE_CONTROL, SHEETS_DTO, SHEETS_HOOKS, SHEETS_PRIMARY_KEY, SHEETS_RELATIONS_LIST, SHEETS_REPOSITORY_MARKER, SHEETS_SPREADSHEET_ID, SHEETS_SUB_COLLECTIONS, SHEETS_TABLE_NAME, SHEETS_VERSION_FIELD, SHEETS_VIRTUALS, SHEETS_VIRTUAL_COLUMNS, SHEET_ODM_MODULE_OPTIONS, SheetOdmModule, type SheetOdmModuleAsyncOptions, SheetOdmModuleOptions, type SheetOdmModuleOptionsFactory, type SheetOdmRootAsyncOptions, type SheetOdmRootOptions, SheetsRepository, SubCollection, type SubCollectionOptions, TABLE_COLUMN_KEY, Table, type TableOptions, type VirtualOptions };
