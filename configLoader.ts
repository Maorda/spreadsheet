export const configLoader = () => ({
    auth: {
        googleDriveConfig: {
            type: 'service_account',
            project_id: process.env.GOOGLE_PROJECT_ID,
            private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
            // Reemplaza los saltos de línea literales por saltos reales para el SDK de Google
            private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CLIENT_ID,
            auth_uri: process.env.GOOGLE_AUTH_URI,
            token_uri: process.env.GOOGLE_TOKEN_URI,
            auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
        },
    },
    odm: {
        googleDriveBaseFolderId: process.env.GOOGLE_FOLDER_ID,
        spreadsheetId: process.env.SPREADSHEET_ID,
        webAppUrl: process.env.GAS_WEBAPP_URL,
        apiKey: process.env.GAS_API_KEY,
        checkConnectionOnBoot: true,
        timezone: process.env.TIMEZONE || 'America/Lima',
        formatDates: process.env.FORMAT_DATES === 'true',
        outboxPollingInterval: 10000,
        outboxRetentionInterval: '2 hours',
        postgres: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '6543', 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME,
            ssl: process.env.DB_SSL === 'true',
        },
    },
});