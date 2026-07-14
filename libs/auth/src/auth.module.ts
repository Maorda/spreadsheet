import { Module, DynamicModule, Global, Provider } from '@nestjs/common';
import { GoogleClientProvider } from './google-client.provider';
import { AUTH_OPTIONS } from './auth.constants';
import { AuthModuleAsyncOptions, AuthModuleOptions, AuthModuleOptionsFactory } from './auth-options.interface';

@Global()
@Module({})
export class SpreadsheetAuthModule {
    static register(options: AuthModuleOptions): DynamicModule {
        return {
            module: SpreadsheetAuthModule,
            providers: [
                {
                    provide: AUTH_OPTIONS,
                    useValue: options,
                },
                GoogleClientProvider,
            ],
            exports: [GoogleClientProvider],
        };
    }
    static registerAsync(options: AuthModuleAsyncOptions): DynamicModule {
        return {
            module: SpreadsheetAuthModule,
            imports: options.imports || [],
            providers: [
                ...this.createAsyncProviders(options),
                GoogleClientProvider,
            ],
            exports: [GoogleClientProvider],
        };
    }

    private static createAsyncProviders(options: AuthModuleAsyncOptions): Provider[] {
        if (options.useFactory) {
            return [
                {
                    provide: AUTH_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
            ];
        }

        // 2. Caso useClass
        if (options.useClass) {
            return [
                {
                    provide: AUTH_OPTIONS,
                    useFactory: async (optionsFactory: AuthModuleOptionsFactory) =>
                        await optionsFactory.createAuthOptions(),
                    inject: [options.useClass!], // Usamos el operador ! porque ya validamos que existe
                },
                options.useClass, // Importante: Debes proveer la clase aquí para que NestJS la pueda instanciar
            ];
        }

        // 3. Caso useExisting
        if (options.useExisting) {
            return [
                {
                    provide: AUTH_OPTIONS,
                    useFactory: async (optionsFactory: AuthModuleOptionsFactory) =>
                        await optionsFactory.createAuthOptions(),
                    inject: [options.useExisting!],
                },
            ];
        }

        throw new Error('Debes proporcionar useFactory, useClass o useExisting en registerAsync');
    }
}