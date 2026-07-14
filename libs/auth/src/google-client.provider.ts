import { Inject, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { AUTH_OPTIONS } from './auth.constants';
import { AuthModuleOptions } from './auth-options.interface';
@Injectable()
export class GoogleClientProvider {
    private _sheets: any;
    private _drive: any;
    private _script: any;
    public docs: any;

    constructor(
        @Inject(AUTH_OPTIONS) private config: AuthModuleOptions,
    ) {
        if (!this.config) {
            console.error("❌ GoogleAuthProvider: 'CONFIG' es undefined en el constructor");
        }
    }
    get script() {
        if (!this._script) {
            this.initialize();
        }
        return this._script;
    }

    // Usamos un Getter para inicialización bajo demanda (lazy-loading)
    get sheets() {
        if (!this._sheets) {
            this.initialize();
        }
        return this._sheets;
    }

    get drive() {
        if (!this._drive) {
            this.initialize();
        }
        return this._drive;
    }

    private initialize() {
        // Extraemos de forma segura el sub-objeto de credenciales
        const googleConfig = this.config.googleDriveConfig;

        if (!googleConfig || !googleConfig.client_email) {
            throw new Error(
                "Configuración de Google no cargada en googleDriveConfig. Verifica tu .env o AppModule."
            );
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: googleConfig.client_email,
                private_key: googleConfig.private_key,
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/drive.readonly',
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/spreadsheets.readonly',
                'https://www.googleapis.com/auth/drive.metadata.readonly',
                'https://www.googleapis.com/auth/script.external_request',
                'https://www.googleapis.com/auth/documents',
                'https://www.googleapis.com/auth/documents.readonly',
            ],
        });

        this._drive = google.drive({ version: 'v3', auth });
        this._sheets = google.sheets({ version: 'v4', auth });
        this._script = google.script({ version: 'v1', auth });
        this.docs = google.docs({ version: 'v1', auth })
    }
}