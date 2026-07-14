// src/lib/interfaces/sheet-odm-options.interface.ts
import { ModuleMetadata, Type } from '@nestjs/common';
import { AuthModuleOptions } from '@spreadsheet/auth';

export interface SheetOdmRootOptions {
    auth: AuthModuleOptions;
    odm: SheetOdmModuleOptions;
}

export interface SheetOdmRootAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<SheetOdmRootOptions> | SheetOdmRootOptions;
    inject?: any[];
    useClass?: Type<any>;
    useExisting?: Type<any>;
}
export const CONNECTION_STABILITY = {
    STABLE: 1500,     // Conexión óptima
    UNSTABLE: 3000,   // Conexión promedio/oscilante
    CRITICAL: 5000    // Conexión muy lenta (Satélite/Radio)
};
export class PostgresConfig {
    host!: string;
    port!: number;
    username!: string;
    password?: string;
    database!: string;
    ssl?: boolean;
}
// 🟢 SOLUCIÓN: Al ser una clase abstracta, esbuild la empaqueta de forma nativa como código JS real
export abstract class SheetOdmModuleOptions {
    outboxRetentionInterval?: string;
    googleDriveBaseFolderId!: string;
    spreadsheetId?: string;
    checkConnectionOnBoot?: boolean;
    webAppUrl!: string;
    apiKey!: string;
    timeout?: number;
    timezone?: string;
    formatDates?: boolean;
    outboxPollingInterval?: number;
    postgres!: PostgresConfig;
}



export interface SheetOdmModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<SheetOdmModuleOptions> | SheetOdmModuleOptions;
    inject?: any[];
    useClass?: Type<SheetOdmModuleOptionsFactory>;
    useExisting?: Type<SheetOdmModuleOptionsFactory>;
}

export interface SheetOdmModuleOptionsFactory {
    createSheetOdmOptions(): Promise<SheetOdmModuleOptions> | SheetOdmModuleOptions;
}
