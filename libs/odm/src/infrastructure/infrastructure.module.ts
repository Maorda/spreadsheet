// src/lib/infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { SheetDataGateway } from './sheet-api/sheet-data.gateway';
import { GasQueryGateway } from './gas-web-app/gas-query.gateway';
import { GoogleClientProvider } from '@spreadsheet/auth';

@Module({
    providers: [
        SheetDataGateway,
        GasQueryGateway,
        GoogleClientProvider,
        // Configuración de Inyección de Dependencias por Interfaz
        {
            provide: 'ISheetWriteDriver',
            useExisting: SheetDataGateway
        },
        {
            provide: 'ISheetReadDriver',
            useExisting: GasQueryGateway
        }
    ],
    exports: [
        'ISheetWriteDriver',
        'ISheetReadDriver',
        SheetDataGateway,
        GasQueryGateway,
        GoogleClientProvider
    ]
})
export class InfrastructureModule { }