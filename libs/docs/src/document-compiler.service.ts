import { Injectable, Logger } from '@nestjs/common';
import {
    Paragraph,
    TextRun,
    ImageRun,
    AlignmentType,
    HeadingLevel,
    ISectionOptions,
    TableOfContents,
    Header,
    Footer,
    PageNumber,
} from 'docx';
import * as fs from 'fs';
import * as path from 'path';
import {
    BloqueContenido,
    DataItem,
    ParagraphConfig,
    RenderDocumentDto,
} from './render-document.dto';
import { DriveDocsService } from './drive-docs.service';
import axios from 'axios';

@Injectable()
export class DocumentCompilerService {
    private readonly logger = new Logger(DocumentCompilerService.name);

    constructor(private readonly driveDocsService: DriveDocsService) { }

    async obtenerBufferImagen(
        imgId: string,
        source: 'web' | 'drive' | 'local' = 'drive',
    ): Promise<Buffer | null> {
        if (!imgId) return null;

        try {
            if (source === 'web') {
                const response = await axios.get(imgId, { responseType: 'arraybuffer' });
                return Buffer.from(response.data, 'binary');
            }
            if (source === 'drive') {
                return await this.driveDocsService.obtenerArchivoComoBuffer(imgId);
            }
            return this.cargarImagenLocal(imgId); // Fallback local
        } catch (error) {
            this.logger.error(
                `❌ Error obteniendo imagen [${imgId}] desde [${source}]: ${error.message}`,
            );
            return null;
        }
    }

    private async buildParagraph(
        data: DataItem[],
        config?: ParagraphConfig | { alignment?: string },
    ): Promise<Paragraph> {
        const runs: any[] = [];

        // 🛡️ BLINDAJE 1: Si 'data' llega undefined (borrado por el DTO) o no es un array, usamos un array vacío
        const itemsSeguros = Array.isArray(data) ? data : [];

        for (const item of itemsSeguros) {
            if (!item) continue; // Si hay un elemento nulo dentro del array, lo saltamos

            // 1. Número de página actual
            if (item.isPageNumber) {
                runs.push(
                    new TextRun({
                        children: [PageNumber.CURRENT],
                        font: item.font || 'Arial',
                        size: item.size || 22,
                        bold: item.style === 'strong',
                    }),
                );
            }
            // 2. Número total de páginas
            else if (item.isTotalPages) {
                runs.push(
                    new TextRun({
                        children: [PageNumber.TOTAL_PAGES],
                        font: item.font || 'Arial',
                        size: item.size || 22,
                        bold: item.style === 'strong',
                    }),
                );
            }
            // 3. Imágenes
            else if (item.img) {
                const source = (item as any).imgSource || 'drive';
                const bufferImagen = await this.obtenerBufferImagen(item.img, source);

                if (bufferImagen) {
                    const tipoImagen = this.obtenerTipoImagen(bufferImagen);
                    runs.push(
                        new ImageRun({
                            data: bufferImagen,
                            transformation: {
                                width: item.transformation?.width ?? 100,
                                height: item.transformation?.height ?? 100,
                            },
                            type: tipoImagen,
                        }),
                    );
                }
            }
            // 4. Texto normal o Saltos de línea
            else {
                if (item.break) {
                    runs.push(new TextRun({ text: '', break: item.break }));
                }
                if (item.text || item.text === '') {
                    runs.push(
                        new TextRun({
                            text: item.text || '',
                            bold: item.style === 'strong',
                            font: item.font || 'Arial',
                            size: item.size || 22,
                        }),
                    );
                }
            }
        }

        // 🛡️ BLINDAJE 2: Extracción segura de configuraciones
        const alignment = this.mapAlignment(config?.alignment);
        const heading =
            config && 'heading' in config
                ? this.mapHeading((config as ParagraphConfig).heading)
                : undefined;
        const indent =
            config && 'indent' in config && (config as ParagraphConfig).indent
                ? { left: (config as ParagraphConfig).indent?.left }
                : undefined;
        const spacing =
            config && 'spacing' in config
                ? (config as ParagraphConfig).spacing
                : undefined;

        return new Paragraph({
            children: runs,
            alignment,
            heading,
            indent,
            spacing,
        });
    }

    async compilarJSON(dto: RenderDocumentDto): Promise<ISectionOptions> {
        // 🛡️ BLINDAJE 3: Si dto.bloques llega undefined o nulo, inicializamos como array vacío
        const bloquesSeguros = Array.isArray(dto?.bloques) ? dto.bloques : [];

        // 1. Procesar el contenido principal (Cuerpo del documento)
        const paragraphChildren = await Promise.all(
            bloquesSeguros.map(async (bloque) => {
                if (!bloque) return new Paragraph({});

                if (bloque.type === 'toc') {
                    const titulo = bloque.config?.title || 'Índice';
                    return new TableOfContents(titulo, {
                        hyperlink: true,
                        headingStyleRange: '1-3',
                    });
                }
                // Pasamos bloque.data de forma segura
                return this.buildParagraph(bloque.data || [], bloque.config);
            }),
        );

        // 2. Procesar Header (si viene en el JSON y tiene datos)
        let headers: any = undefined;
        if (dto?.header && Array.isArray(dto.header.data)) {
            const headerParagraph = await this.buildParagraph(dto.header.data, {
                alignment: dto.header.alignment,
            });
            headers = { default: new Header({ children: [headerParagraph] }) };
        }

        // 3. Procesar Footer (si viene en el JSON y tiene datos)
        let footers: any = undefined;
        if (dto?.footer && Array.isArray(dto.footer.data)) {
            const footerParagraph = await this.buildParagraph(dto.footer.data, {
                alignment: dto.footer.alignment,
            });
            footers = { default: new Footer({ children: [footerParagraph] }) };
        }

        // 4. Retornar la sección completa
        return {
            children: paragraphChildren,
            headers,
            footers,
        };
    }

    /**
     * Carga una imagen física del servidor para incrustarla en el Word
     */
    private cargarImagenLocal(nombreImagen: string): Buffer | null {
        try {
            const ruta = path.join(process.cwd(), 'assets', nombreImagen);
            if (!fs.existsSync(ruta)) {
                this.logger.warn(`⚠️ Imagen local no encontrada en la ruta: ${ruta}`);
                return null;
            }
            return fs.readFileSync(ruta);
        } catch (error) {
            this.logger.warn(
                `❌ No se pudo cargar la imagen: ${nombreImagen}. Error: ${error.message}`,
            );
            return null;
        }
    }

    private mapAlignment(
        align?: string,
    ): typeof AlignmentType[keyof typeof AlignmentType] | undefined {
        switch (align) {
            case 'left':
                return AlignmentType.LEFT;
            case 'right':
                return AlignmentType.RIGHT;
            case 'center':
                return AlignmentType.CENTER;
            case 'justify':
                return AlignmentType.JUSTIFIED;
            case 'distribute':
                return AlignmentType.DISTRIBUTE;
            default:
                return undefined;
        }
    }

    private mapHeading(
        heading?: string,
    ): typeof HeadingLevel[keyof typeof HeadingLevel] | undefined {
        switch (heading) {
            case 'Heading1':
                return HeadingLevel.HEADING_1;
            case 'Heading2':
                return HeadingLevel.HEADING_2;
            case 'Heading3':
                return HeadingLevel.HEADING_3;
            case 'Heading4':
                return HeadingLevel.HEADING_4;
            default:
                return undefined;
        }
    }
    private obtenerTipoImagen(buffer: Buffer): 'png' | 'jpg' | 'gif' | 'bmp' {
        if (!buffer || buffer.length < 4) return 'png'; // Fallback por defecto

        // PNG: 89 50 4E 47
        if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
            return 'png';
        }
        // JPG/JPEG: FF D8 FF
        if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
            return 'jpg';
        }
        // GIF: 47 49 46 (GIF)
        if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
            return 'gif';
        }
        // BMP: 42 4D (BM)
        if (buffer[0] === 0x42 && buffer[1] === 0x4d) {
            return 'bmp';
        }

        return 'png'; // Si no se reconoce, intentamos incrustarlo como PNG
    }
}