import { Injectable, Logger } from '@nestjs/common';
import { Paragraph, TextRun, AlignmentType, ISectionOptions } from 'docx';
import { DriveDocsService } from '@spreadsheet/docs';
import { GenerarCartaDto } from './app.controller';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
@Injectable()
export class CartasService {
  private readonly logger = new Logger(CartasService.name);

  constructor(private readonly driveDocsService: DriveDocsService) { }

  /**
   * Construye la estructura visual de la carta de presentación y delega
   * la subida, conversión a PDF y limpieza al orquestador.
   */
  async generarCartaPresentacionPdf(dto: GenerarCartaDto): Promise<Buffer> {
    this.logger.log(`Iniciando diseño de carta de presentación de ${dto.remitenteNombre}`);

    // Diseñamos la estructura formal de la carta
    const estructuraCarta: ISectionOptions = {
      properties: {
        page: {
          margin: {
            top: 1440,    // 2.54 cm en dxa (márgenes estándar)
            bottom: 1440,
            left: 1440,
            right: 1440,
          },
        },
      },
      children: [
        // 1. Fecha (Alineada a la derecha)
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: dto.fecha,
              size: 22, // 11pt
              font: 'Arial',
            }),
          ],
          spacing: { after: 400 },
        }),

        // 2. Bloque del Destinatario
        new Paragraph({
          children: [
            new TextRun({ text: 'Señor(a):', bold: true, size: 22, font: 'Arial' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: dto.destinatarioNombre, bold: true, size: 22, font: 'Arial' }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: dto.destinatarioCargo, size: 22, font: 'Arial', italics: true }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: dto.destinatarioEmpresa, bold: true, size: 22, font: 'Arial' }),
          ],
          spacing: { after: 300 },
        }),

        // 3. Asunto (Subrayado y en negrita)
        new Paragraph({
          children: [
            new TextRun({ text: 'ASUNTO: ', bold: true, size: 22, font: 'Arial' }),
            new TextRun({ text: dto.asunto, size: 22, font: 'Arial', underline: {} }),
          ],
          spacing: { after: 400 },
        }),

        // 4. Saludo inicial
        new Paragraph({
          children: [
            new TextRun({ text: 'De mi consideración:', size: 22, font: 'Arial' }),
          ],
          spacing: { after: 200 },
        }),

        // 5. Cuerpo de la carta (Párrafos dinámicos justificados e interlineado de 1.5)
        ...dto.cuerpo.map(
          (parrafoTexto) =>
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({ text: parrafoTexto, size: 22, font: 'Arial', bold: true }),
              ],
              spacing: { after: 200, line: 360 }, // 360 dxa = 1.5 de interlineado
            })
        ),

        // 6. Despedida formal
        new Paragraph({
          children: [
            new TextRun({
              text: 'Sin otro particular, me despido de usted expresándole las muestras de mi especial estima y consideración personal.',
              size: 22,
              font: 'Arial',
            }),
          ],
          spacing: { before: 200, after: 800 },
        }),

        // 7. Firma (Centrada en la parte inferior)
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Atentamente,', size: 22, font: 'Arial' }),
          ],
          spacing: { after: 600 }, // Espacio para firma física u holográfica
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: dto.remitenteNombre, bold: true, size: 22, font: 'Arial' }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: dto.remitenteCargo, size: 22, font: 'Arial', italics: true }),
          ],
        }),
        ...(dto.remitenteContacto
          ? [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: dto.remitenteContacto,
                  size: 20,
                  font: 'Arial',
                  color: '555555',
                }),
              ],
            }),
          ]
          : []),
      ],
    };

    // Formateamos un nombre limpio para el archivo en Drive (ej: Carta_Juan_Perez.docx)
    const nombreLimpio = `Carta_${dto.remitenteNombre.replace(/\s+/g, '_')}`;

    // Despachamos el trabajo pesado a nuestro orquestador
    return await this.driveDocsService.generarPdfDesdeEstructura(
      estructuraCarta,
      nombreLimpio,
      dto.carpetaId
    );
  }
}