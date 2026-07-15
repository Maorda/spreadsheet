import Joi from 'joi';

export const envValidationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),

    // 🛡️ Configuración de Google
    GOOGLE_PROJECT_ID: Joi.string().required(),
    GOOGLE_PRIVATE_KEY_ID: Joi.string().required(),
    GOOGLE_PRIVATE_KEY: Joi.string().required(),
    GOOGLE_CLIENT_EMAIL: Joi.string().email().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_AUTH_URI: Joi.string().default('https://accounts.google.com/o/oauth2/auth'),
    GOOGLE_TOKEN_URI: Joi.string().default('https://oauth2.googleapis.com/token'),
    GOOGLE_AUTH_PROVIDER_X509_CERT_URL: Joi.string().default('https://www.googleapis.com/oauth2/v1/certs'),
    GOOGLE_CLIENT_X509_CERT_URL: Joi.string().required(),

    // 🛡️ IDs de Negocio y Google Apps Script (GAS)
    GOOGLE_FOLDER_ID: Joi.string().required(),
    SPREADSHEET_ID: Joi.string().required(),
    GAS_WEBAPP_URL: Joi.string().uri().required(),
    GAS_API_KEY: Joi.string().required(),

    // 🛡️ Base de Datos PostgreSQL
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(6543),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().allow('').default(''),
    DB_NAME: Joi.string().required(),
    DB_SSL: Joi.boolean().default(false),

    // 🛡️ Configuración regional
    TIMEZONE: Joi.string().default('America/Lima'),
    FORMAT_DATES: Joi.boolean().default(false),
});