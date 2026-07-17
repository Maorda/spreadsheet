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
    PageBreak,
    Table,
    TableRow,
    TableCell,
    WidthType,
} from 'docx';

const ANCHO_TOTAL_PAGINA_DXA = 9026;

import * as fs from 'fs';
import * as path from 'path';
import {
    BloqueContenido,
    DataItem,
    ParagraphConfig,
    RenderDocumentDto,
    RowConfig,
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
            let buffer: Buffer | null = null;

            if (source === 'web') {
                const response = await axios.get(imgId, { responseType: 'arraybuffer' });
                buffer = Buffer.from(response.data, 'binary');
            } else if (source === 'drive') {
                buffer = await this.driveDocsService.obtenerArchivoComoBuffer(imgId);
            } else {
                buffer = this.cargarImagenLocal(imgId); // Fallback local
            }

            if (!buffer || buffer.length === 0) {
                this.logger.warn(`⚠️ El buffer de la imagen [${imgId}] llegó vacío desde [${source}].`);
                return null;
            }

            // --- Auditoría de Firma Hexadecimal (Magic Numbers) ---
            const hexHeader = buffer.subarray(0, 4).toString('hex').toLowerCase();
            const esPng = hexHeader.startsWith('89504e47');
            const esJpg = hexHeader.startsWith('ffd8');
            const esWebp = buffer.subarray(8, 12).toString('ascii') === 'WEBP'; // RIFF....WEBP

            if (!esPng && !esJpg && !esWebp) {
                // Comprobamos si nos devolvió un texto/JSON en vez de una imagen (ej. error 403 de Google Drive)
                const posibleTexto = buffer.subarray(0, 50).toString('utf8');
                this.logger.error(
                    `❌ [${imgId}] no es una imagen válida. Cabecera Hex: [${hexHeader}]. Contenido devuelto: ${posibleTexto}`,
                );
                return null;
            }

            return buffer;
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
            // 3. Imágenes (CON PATRÓN DE LOGGING ESTRATÉGICO)
            else if (item.img) {
                const source = (item as any).imgSource || 'drive';
                this.logger.debug(`🖼️ [BuildParagraph] Procesando imagen [ID: ${item.img} | Origen: ${source}]...`);

                const bufferImagen = await this.obtenerBufferImagen(item.img, source);

                if (!bufferImagen || bufferImagen.length === 0) {
                    this.logger.warn(`⚠️ [BuildParagraph] El buffer para la imagen [${item.img}] llegó nulo o vacío. Se omitirá del párrafo.`);
                } else {
                    // Inspeccionamos los primeros 4 bytes del binario
                    const hexHeader = bufferImagen.subarray(0, 4).toString('hex').toUpperCase();
                    const tipoImagen = this.obtenerTipoImagen(bufferImagen);
                    const ancho = item.transformation?.width ?? 100;
                    const alto = item.transformation?.height ?? 100;

                    // 🎯 LOG DE DIAGNÓSTICO: Esto nos dirá la verdad absoluta de lo que está pasando
                    this.logger.log(
                        `📊 [Diagnostics] Img ID: ${item.img} | Peso: ${bufferImagen.length} bytes | Hex: [${hexHeader}] | Tipo detectado: "${tipoImagen}" | Dimensiones: ${ancho}x${alto}`
                    );

                    // Validación de seguridad para la librería 'docx' y Google Docs
                    if (!tipoImagen) {
                        this.logger.error(`❌ [BuildParagraph] No se pudo determinar el tipo de archivo para [${item.img}]. El Hex [${hexHeader}] no coincide con PNG/JPG. Imagen descartada.`);
                    } else {
                        // Alerta si el tipo detectado es un MIME type (ej. "image/png") en lugar de extensión ("png")
                        if (typeof tipoImagen === 'string' && tipoImagen.includes('/')) {
                            this.logger.warn(`⚠️ [BuildParagraph] CUIDADO: obtenerTipoImagen devolvió "${tipoImagen}". La librería docx y Google Docs suelen exigir la extensión simple ('png', 'jpg') sin el prefijo 'image/'.`);
                        }

                        try {
                            runs.push(
                                new ImageRun({
                                    data: bufferImagen,
                                    transformation: { width: ancho, height: alto },
                                    type: tipoImagen as any,
                                }),
                            );
                            this.logger.debug(`✅ [BuildParagraph] ImageRun creado con éxito para [${item.img}].`);
                        } catch (imgError: any) {
                            this.logger.error(`❌ [BuildParagraph] Error fatal al instanciar ImageRun para [${item.img}]: ${imgError.message}`, imgError.stack);
                        }
                    }
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
                            // 🛡️ PRO-TIP: Eliminamos el '#' si viene incluido para evitar errores en Word
                            color: item.color ? item.color.replace('#', '') : undefined,
                            underline: item.underline ? {} : undefined,
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

        const paragraphChildren = await Promise.all(
            bloquesSeguros.map(async (bloque) => {
                if (!bloque) return new Paragraph({});

                // CASO 1: Índice (TOC)
                if (bloque.type === 'toc') {
                    const titulo = bloque.config?.title || 'Índice';
                    return new TableOfContents(titulo, {
                        hyperlink: true,
                        headingStyleRange: '1-3',
                    });
                }

                // CASO 2: Salto de página explícito
                if (bloque.type === 'page-break') {
                    return new Paragraph({
                        children: [new PageBreak()],
                    });
                }

                // CASO 3: Tablas dinámicas
                if (bloque.type === 'table' && Array.isArray(bloque.rows)) {
                    return await this.buildTable(bloque.rows);
                }

                // CASO 4: Párrafo normal por defecto
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
        if (dto?.footer && Array.isArray(dto.footer) && dto.footer.length > 0) {
            const footerChildren = await Promise.all(
                dto.footer.map(async (bloque) => {
                    // Reutilizamos la lógica de bloques que ya tienes hecha
                    if (bloque.type === 'table' && Array.isArray(bloque.rows)) {
                        return await this.buildTable(bloque.rows);
                    }
                    return this.buildParagraph(bloque.data || [], bloque.config);
                })
            );

            footers = {
                default: new Footer({ children: footerChildren })
            };
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
    private async buildTable(rowsData: RowConfig[]): Promise<Table> {
        const tableRows: TableRow[] = [];
        const ANCHO_MAXIMO_DXA = 9026;

        for (const row of rowsData) {
            const tableCells: TableCell[] = [];

            for (const cell of (row.cells || [])) {
                const cellParagraph = await this.buildParagraph(cell.content || [], {
                    alignment: cell.alignment,
                });

                // ✅ SOLUCIÓN: Usamos const y operador ternario. 
                // TypeScript inferirá automáticamente: { size: number; type: string; } | undefined
                const widthConfig = cell.width
                    ? {
                        size: Math.round((cell.width / 100) * ANCHO_MAXIMO_DXA),
                        type: WidthType.DXA,
                    }
                    : undefined;

                tableCells.push(
                    new TableCell({
                        children: [cellParagraph],
                        width: widthConfig,
                    })
                );
            }

            tableRows.push(new TableRow({ children: tableCells }));
        }

        return new Table({
            rows: tableRows,
            width: { size: ANCHO_MAXIMO_DXA, type: WidthType.DXA },
        });
    }
}