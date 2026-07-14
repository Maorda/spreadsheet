import { ModuleMetadata, Type } from '@nestjs/common';
export class GoogleCredentials {
    type!: string;
    project_id?: string;
    private_key_id?: string;
    private_key?: string;
    client_email?: string;
    client_id?: string;
    auth_uri?: string;
    token_uri?: string;
    auth_provider_x509_cert_url?: string;
    client_x509_cert_url?: string;
    universe_domain?: string;
}

export abstract class AuthModuleOptions {
    googleDriveConfig!: GoogleCredentials;
}
export class GoogleDriveConfig {
    client_email!: string;
    private_key!: string;
}

export abstract class SpreadsheetsAuthOptions {
    googleDriveConfig!: GoogleDriveConfig;
    googleDriveBaseFolderId!: string;
    spreadsheetId?: string;
    webAppUrl!: string;
    apiKey!: string;
    formatDates?: boolean;
}
export interface AuthModuleOptionsFactory {
    createAuthOptions(): Promise<AuthModuleOptions> | AuthModuleOptions;
}

export interface AuthModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<AuthModuleOptions> | AuthModuleOptions;
    inject?: any[];
    useClass?: Type<AuthModuleOptionsFactory>;
    useExisting?: Type<AuthModuleOptionsFactory>;
}