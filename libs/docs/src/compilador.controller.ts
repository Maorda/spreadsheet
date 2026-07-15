import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { DocumentCompilerService } from './document-compiler.service';
import { DriveDocsService } from './drive-docs.service';

import type { Response } from 'express';
import { RenderDocumentoDto } from './render-documento.dto';

@Controller('motor-documentos')
export class CompiladorController {
    constructor(
        private readonly compilerService: DocumentCompilerService,
        private readonly driveDocsService: DriveDocsService
    ) { }

    @Post('generar-pdf')
    async generarPdfDinamico(
        @Body() dto: RenderDocumentoDto,
        @Res() res: Response
    ) {
        try {
            // 1. Traducir el JSON del Body a la estructura nativa de DOCX
            const estructuraDocx = this.compilerService.compilarJSON(dto.bloques);

            // 2. Invocar nuestro orquestador estrella para convertirlo a PDF en Drive y limpiar residuo
            const pdfBuffer = await this.driveDocsService.generarPdfDesdeEstructura(
                estructuraDocx,
                dto.nombreArchivo,
                dto.carpetaId
            );

            // 3. Responder enviando la descarga directa del PDF
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
                'Content-Disposition',
                `attachment; filename="${dto.nombreArchivo}.pdf"`
            );
            res.setHeader('Content-Length', pdfBuffer.length.toString());

            res.end(pdfBuffer);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error al compilar y generar el documento dinámico.',
                    details: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}