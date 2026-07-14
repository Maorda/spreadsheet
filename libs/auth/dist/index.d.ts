import { ModuleMetadata, Type, DynamicModule } from '@nestjs/common';

declare class GoogleCredentials {
    type: string;
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
declare abstract class AuthModuleOptions {
    googleDriveConfig: GoogleCredentials;
}
declare class GoogleDriveConfig {
    client_email: string;
    private_key: string;
}
declare abstract class SpreadsheetsAuthOptions {
    googleDriveConfig: GoogleDriveConfig;
    googleDriveBaseFolderId: string;
    spreadsheetId?: string;
    webAppUrl: string;
    apiKey: string;
    formatDates?: boolean;
}
interface AuthModuleOptionsFactory {
    createAuthOptions(): Promise<AuthModuleOptions> | AuthModuleOptions;
}
interface AuthModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<AuthModuleOptions> | AuthModuleOptions;
    inject?: any[];
    useClass?: Type<AuthModuleOptionsFactory>;
    useExisting?: Type<AuthModuleOptionsFactory>;
}

declare class GoogleClientProvider {
    private config;
    private _sheets;
    private _drive;
    private _script;
    docs: any;
    constructor(config: AuthModuleOptions);
    get script(): any;
    get sheets(): any;
    get drive(): any;
    private initialize;
}

declare class SpreadsheetAuthModule {
    static register(options: AuthModuleOptions): DynamicModule;
    static registerAsync(options: AuthModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
}

declare const AUTH_OPTIONS = "AUTH_OPTIONS";
declare const SHEET_ODM_OPTIONS = "SHEET_ODM_OPTIONS";

export { AUTH_OPTIONS, type AuthModuleAsyncOptions, AuthModuleOptions, type AuthModuleOptionsFactory, GoogleClientProvider, GoogleCredentials, GoogleDriveConfig, SHEET_ODM_OPTIONS, SpreadsheetAuthModule, SpreadsheetsAuthOptions };
