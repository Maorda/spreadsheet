import { Injectable, Logger } from '@nestjs/common';
import {
    Paragraph,
    TextRun,
    ImageRun,
    AlignmentType,
    HeadingLevel,
    ISectionOptions
} from 'docx';
import * as fs from 'fs';
import * as path from 'path';
import { BloqueContenido } from './render-documento.dto';
import { DriveDocsService } from './drive-docs.service';
import axios from 'axios';

@Injectable()
export class DocumentCompilerService {
    private readonly logger = new Logger(DocumentCompilerService.name);

    constructor(private readonly driveDocsService: DriveDocsService) { }

    async obtenerBufferImagen(imgId: string, source: 'web' | 'drive' | 'local'): Promise<Buffer | null> {
        if (source === 'web') {
            try {
                const response = await axios.get(imgId, { responseType: 'arraybuffer' });
                return Buffer.from(response.data, 'binary');
            } catch (error) {
                return null; // Si falla la web, devolvemos null en lugar de romper todo
            }
        }

        if (source === 'drive') {
            return await this.driveDocsService.obtenerArchivoComoBuffer(imgId);
        }

        return this.cargarImagenLocal(imgId);
    }

    /**
     * Traduce el JSON dinámico recibido por el body a la estructura nativa ISectionOptions de docx
     */
    compilarJSON(bloques: BloqueContenido[]): ISectionOptions {
        const paragraphChildren = bloques.map((bloque) => {
            const runs: any[] = [];

            // 1. Procesar cada elemento del "data" (runs de texto e imágenes)
            for (const item of bloque.data) {

                // ¿Es una imagen?
                if (item.img) {
                    const bufferImagen = this.cargarImagenLocal(item.img);

                    if (bufferImagen) {
                        // Extraemos la extensión del archivo para pasarla dinámicamente ("png", "jpg", etc.)
                        const extension = item.img.split('.').pop()?.toLowerCase() || 'png';
                        // Normalizamos extensiones comunes para cumplir estrictamente con el tipado de docx
                        const imageType = extension === 'jpeg' ? 'jpg' : extension;

                        runs.push(
                            new ImageRun({
                                data: bufferImagen,
                                // Indicamos explícitamente el tipo para satisfacer la interfaz SvgMediaOptions & CoreImageOptions
                                type: imageType as 'png' | 'jpg' | 'gif',
                                transformation: {
                                    width: item.transformation?.width ?? 50,
                                    height: item.transformation?.height ?? 50,
                                },
                            })
                        );
                    }

                    // Si tiene un break después de la imagen
                    if (item.break) {
                        runs.push(new TextRun({ text: '', break: item.break }));
                    }

                } else {
                    // Es texto normal o con estilos
                    runs.push(
                        new TextRun({
                            text: item.text,
                            bold: item.style === 'strong',
                            break: item.break,
                            font: 'Arial',
                            size: 22, // 11pt estándar
                        })
                    );
                }
            }

            // 2. Procesar las configuraciones del párrafo (config)
            return new Paragraph({
                children: runs,
                alignment: this.mapAlignment(bloque.config?.alignment),
                heading: this.mapHeading(bloque.config?.heading),
                indent: bloque.config?.indent ? { left: bloque.config.indent.left } : undefined,
                spacing: bloque.config?.spacing
                    ? { line: bloque.config.spacing.line, after: bloque.config.spacing.after }
                    : undefined,
            });
        });

        return {
            children: paragraphChildren,
        };
    }

    /**
     * Carga una imagen física del servidor para incrustarla en el Word
     */
    private cargarImagenLocal(nombreImagen: string): Buffer | null {
        try {
            // Ruta recomendada donde guardas las imágenes de tus plantillas
            const ruta = path.join(process.cwd(), 'assets', nombreImagen);
            return fs.readFileSync(ruta);
        } catch (error) {
            this.logger.warn(`No se pudo cargar la imagen: ${nombreImagen}. Error: ${error.message}`);
            return null;
        }
    }

    private mapAlignment(align?: string): typeof AlignmentType[keyof typeof AlignmentType] | undefined {
        switch (align) {
            case 'left': return AlignmentType.LEFT;
            case 'right': return AlignmentType.RIGHT;
            case 'center': return AlignmentType.CENTER;
            case 'justify': return AlignmentType.JUSTIFIED;
            case 'distribute': return AlignmentType.DISTRIBUTE;
            default: return undefined;
        }
    }

    private mapHeading(heading?: string): typeof HeadingLevel[keyof typeof HeadingLevel] | undefined {
        switch (heading) {
            case 'Heading1': return HeadingLevel.HEADING_1;
            case 'Heading2': return HeadingLevel.HEADING_2;
            case 'Heading3': return HeadingLevel.HEADING_3;
            case 'Heading4': return HeadingLevel.HEADING_4;
            default: return undefined;
        }
    }
}