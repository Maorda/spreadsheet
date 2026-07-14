import { ValidationPipe, Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const isProd = process.env.NODE_ENV === 'production';

  // 1. Carga segura de HTTPS (Evita roturas si no existen los certificados)
  let httpsOptions: any = null;
  try {
    if (fs.existsSync('./private.pem') && fs.existsSync('./certificate.crt')) {
      httpsOptions = {
        key: fs.readFileSync('./private.pem'),
        cert: fs.readFileSync('./certificate.crt'),
      };
      logger.log('🔐 Certificados SSL locales cargados correctamente.');
    } else if (!isProd) {
      logger.warn('⚠️ No se encontraron certificados SSL. Arrancando en modo HTTP simple.');
    }
  } catch (error) {
    logger.error('❌ Error leyendo certificados SSL:', error);
  }

  // 2. Creación de la aplicación (Inyecta httpsOptions solo si existen)
  const app = await NestFactory.create(AppModule, {
    httpsOptions: httpsOptions || undefined,
  });

  // 3. Configuración del Pipeline de Validación Global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían propiedades extra
      transform: true, // Transforma los tipos de datos automáticamente
    }),
  );

  // 4. Whitelist de CORS (Estrictamente Protocolo + Dominio + Puerto)
  const whitelist = [
    'https://localhost:4200',
    'http://localhost:4200',
    'https://192.168.1.86:4444',
    'https://192.168.1.86:3033',
    'https://legendary-space-fiesta-69vxg6jqp77xf49rg-5000.app.github.dev',
    'https://miniature-space-zebra-7v7j9qg6xrjx266g-4200.app.github.dev',
    'https://4200-monospace-sadfrontenddrive17-1713883251017.cluster-2xid2zxbenc4ixa74rpk7q7fyk.cloudworkstations.dev',
    'https://9000-monospace-sadfrontenddrive17casa-1714798683819.cluster-hf4yr35cmnbd4vhbxvfvc6cp5q.cloudworkstations.dev',
    'https://4200-monospace-sadfrontenddrive17-1714863088995.cluster-wfwbjypkvnfkaqiqzlu3ikwjhe.cloudworkstations.dev',
    'https://sadfrontenddrive17.onrender.com',
    'https://4200-idx-sadfrontenddrive17-1717536473815.cluster-m7tpz3bmgjgoqrktlvd4ykrc2m.cloudworkstations.dev',
    'https://4200-idx-sadfrontenddrive17-1717632774583.cluster-kc2r6y3mtba5mswcmol45orivs.cloudworkstations.dev',
    'https://9000-idx-sadfrontenddrive17-1717632774583.cluster-kc2r6y3mtba5mswcmol45orivs.cloudworkstations.dev',
  ];

  const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      // Si el origin está en la whitelist o si no hay origin (ej. llamadas de Postman/backend o modo 'dev' con '*')
      if (!origin || whitelist.includes(origin) || (!isProd && whitelist.includes('*'))) {
        callback(null, true);
      } else {
        logger.error(`🚫 Bloqueado por CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);

  // 5. Habilitar la inyección de dependencias en class-validator (Para custom validators)
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // 6. Configuración de puerto y arranque
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    const protocol = httpsOptions ? 'https' : 'http';
    logger.log(`🚀 Servidor NestJS corriendo en: ${protocol}://localhost:${port}`);
    if (!isProd) {
      logger.log(`📡 Accesible en red local: ${protocol}://192.168.1.86:${port}`);
    }
  });
}
bootstrap();