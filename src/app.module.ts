import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SheetOdmModule } from '@spreadsheet/odm';
import { PlanillaAdminController, PlanillaTareoService } from './app.controller';
import { AdelantoEntity, ObreroEntity } from './entity';
import { configLoader } from '../configLoader';
import { envValidationSchema } from '../env.validation';
import { DocsModule } from '@spreadsheet/docs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader],                  // Carga tus variables personalizadas
      validationSchema: envValidationSchema, // 🛡️ Bloquea el arranque si falta algo del .env
      validationOptions: {
        allowUnknown: true, // Permite que existan otras variables en el .env sin que Joi lance error
        abortEarly: false,  // Muestra TODOS los errores a la vez, no solo el primero
      },
    }),

    SheetOdmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // 🚀 Extraemos las configuraciones ya armadas y validadas desde el configLoader
      useFactory: (config: ConfigService) => ({
        auth: config.get('auth')!,
        odm: config.get('odm')!,
      }),
    }),

    SheetOdmModule.forFeature([ObreroEntity, AdelantoEntity]),
    DocsModule,
  ],
  controllers: [PlanillaAdminController],
  providers: [PlanillaTareoService],
})
export class AppModule { }