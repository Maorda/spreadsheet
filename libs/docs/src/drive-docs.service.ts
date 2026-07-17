// libs/docs/src/services/drive-docs.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { GoogleClientProvider } from '@spreadsheet/auth'; // Importamos de tu librería hermana
import { Readable } from 'stream';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, FileChild, IHeaderFooterOptions, ISectionOptions } from 'docx';



@Injectable()
export class DriveDocsService {
    private readonly logger = new Logger(DriveDocsService.name);

    // Inyectamos tu proveedor de manera directa y elegante
    constructor(private readonly googleClient: GoogleClientProvider) { }
    public async generarPdfDesdeEstructura(
        payload: ISectionOptions,
        nombreArchivoDocx: string,
        carpetaContenedoraId: string
    ): Promise<Buffer> {
        let tempDocId: string | null = null;

        try {
            // 1. Construir el buffer del Word (.docx) en memoria
            const docxBuffer = await this.construirDocumento(payload);

            // 2. Subir y convertir a Google Doc usando tu método exacto
            // (Nota: docxBuffer al ser Buffer hereda de Uint8Array, por lo que es 100% compatible)
            tempDocId = await this.creaDocumento(
                docxBuffer,
                nombreArchivoDocx,
                carpetaContenedoraId
            );

            // 3. Exportar el Google Doc a un Buffer de PDF
            const pdfBuffer = await this.exportarAPdf(tempDocId);

            return pdfBuffer;
        } catch (error) {
            this.logger.error(`Error en el flujo de generación del PDF "${nombreArchivoDocx}":`, error);
            throw error;
        } finally {
            // 4. Limpieza: Eliminamos el archivo de Google Drive pase lo que pase en el 'try'
            if (tempDocId) {
                /*await this.eliminarArchivo(tempDocId).catch((err) =>
                    this.logger.error(`No se pudo eliminar el archivo temporal ${tempDocId}:`, err)
                
                );*/
                console.log(`Archivo temporal ${tempDocId} no se eliminó.`);
            }
        }
    }

    private async creaDocumento(
        content1: Uint8Array,
        nombreArchivoDocx: string,
        carpetaContenedoraId: string
    ): Promise<string> {
        const filename = nombreArchivoDocx;
        const rootFolderId = carpetaContenedoraId;

        // Convertimos el Uint8Array a un stream de lectura de Node de forma nativa
        const bufferStream = Readable.from(Buffer.from(content1));

        const fileMetadata = {
            name: filename,
            parents: [rootFolderId],
            // ¡CRUCIAL! Esto le dice a Google que CONVIERTA el Word en un Google Doc editable
            mimeType: "application/vnd.google-apps.document"
        };

        const media = {
            // Especificamos que lo que estamos enviando físicamente es un .docx
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            body: bufferStream
        };

        const file = await this.googleClient.drive.files.create({
            requestBody: fileMetadata, // 'requestBody' es el estándar moderno en googleapis
            media: media,
            fields: 'id'
        });

        if (!file.data.id) {
            throw new Error('No se pudo obtener el ID del documento creado en Google Drive.');
        }

        return file.data.id;
    }

    private async construirDocumento(payload: ISectionOptions): Promise<Buffer> {
        const doc = new Document({
            sections: [payload], // Pasamos el payload completo que cumple con ISectionOptions
        });

        return await Packer.toBuffer(doc);
    }


    private async exportarAPdf(fileId: string): Promise<Buffer> {
        const response = await this.googleClient.drive.files.export(
            {
                fileId: fileId,
                mimeType: 'application/pdf',
            },
            {
                responseType: 'arraybuffer', // Crucial para que NestJS lo reciba como datos binarios directos
            }
        );

        return Buffer.from(response.data as ArrayBuffer);
    }

    private async eliminarArchivo(fileId: string): Promise<void> {
        await this.googleClient.drive.files.delete({ fileId });
        this.logger.log(`Archivo temporal ${fileId} eliminado con éxito.`);
    }

    /**
 * Descarga el contenido binario de un archivo de Google Drive dado su ID.
 * Útil para obtener logotipos o imágenes dinámicas.
 * 
 * @param fileId El ID del archivo en Google Drive
 * @returns Buffer con el contenido de la imagen
 */
    async obtenerArchivoComoBuffer(fileId: string): Promise<Buffer> {
        try {
            // 1. Solicitamos el archivo como 'stream' (evita bugs de gaxios con arraybuffer)
            const response = await this.googleClient.drive.files.get(
                {
                    fileId: fileId,
                    alt: 'media',
                },
                {
                    responseType: 'stream',
                }
            );

            // 2. Acumulamos los fragmentos (chunks) en un Buffer nativo de Node.js
            return await new Promise<Buffer>((resolve, reject) => {
                const chunks: Buffer[] = [];

                response.data.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
                response.data.on('end', () => resolve(Buffer.concat(chunks)));
                response.data.on('error', (err: any) => reject(err));
            });
        } catch (error: any) {
            // Extraemos el código HTTP para diagnosticar si es un problema de permisos (403/404)
            const status = error?.response?.status || error?.status || 'Desconocido';
            const mensaje = error?.response?.data?.error?.message || error.message;

            this.logger.error(
                `❌ Error descargando recurso de Drive [ID: ${fileId} | HTTP: ${status}]: ${mensaje}`,
            );

            throw new Error(`No se pudo obtener la imagen ${fileId} desde Google Drive (HTTP ${status}).`);
        }
    }


}