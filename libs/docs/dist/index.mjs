var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/docs.module.ts
import { Module } from "@nestjs/common";

// src/drive-docs.service.ts
import { Injectable, Logger } from "@nestjs/common";
import { GoogleClientProvider } from "@spreadsheet/auth";
import { Readable } from "stream";
import { Document, Packer } from "docx";
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
var DriveDocsService = class _DriveDocsService {
  static {
    __name(this, "DriveDocsService");
  }
  googleClient;
  logger = new Logger(_DriveDocsService.name);
  // Inyectamos tu proveedor de manera directa y elegante
  constructor(googleClient) {
    this.googleClient = googleClient;
  }
  async generarPdfDesdeEstructura(payload, nombreArchivoDocx, carpetaContenedoraId) {
    let tempDocId = null;
    try {
      const docxBuffer = await this.construirDocumento(payload);
      tempDocId = await this.creaDocumento(docxBuffer, nombreArchivoDocx, carpetaContenedoraId);
      const pdfBuffer = await this.exportarAPdf(tempDocId);
      return pdfBuffer;
    } catch (error) {
      this.logger.error(`Error en el flujo de generaci\xF3n del PDF "${nombreArchivoDocx}":`, error);
      throw error;
    } finally {
      if (tempDocId) {
        await this.eliminarArchivo(tempDocId).catch((err) => this.logger.error(`No se pudo eliminar el archivo temporal ${tempDocId}:`, err));
      }
    }
  }
  async creaDocumento(content1, nombreArchivoDocx, carpetaContenedoraId) {
    const filename = nombreArchivoDocx;
    const rootFolderId = carpetaContenedoraId;
    const bufferStream = Readable.from(Buffer.from(content1));
    const fileMetadata = {
      name: filename,
      parents: [
        rootFolderId
      ],
      // ¡CRUCIAL! Esto le dice a Google que CONVIERTA el Word en un Google Doc editable
      mimeType: "application/vnd.google-apps.document"
    };
    const media = {
      // Especificamos que lo que estamos enviando físicamente es un .docx
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      body: bufferStream
    };
    const file = await this.googleClient.drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id"
    });
    if (!file.data.id) {
      throw new Error("No se pudo obtener el ID del documento creado en Google Drive.");
    }
    return file.data.id;
  }
  async construirDocumento(payload) {
    const doc = new Document({
      sections: [
        payload
      ]
    });
    return await Packer.toBuffer(doc);
  }
  async exportarAPdf(fileId) {
    const response = await this.googleClient.drive.files.export({
      fileId,
      mimeType: "application/pdf"
    }, {
      responseType: "arraybuffer"
    });
    return Buffer.from(response.data);
  }
  async eliminarArchivo(fileId) {
    await this.googleClient.drive.files.delete({
      fileId
    });
    this.logger.log(`Archivo temporal ${fileId} eliminado con \xE9xito.`);
  }
  /**
  * Descarga el contenido binario de un archivo de Google Drive dado su ID.
  * Útil para obtener logotipos o imágenes dinámicas.
  * 
  * @param fileId El ID del archivo en Google Drive
  * @returns Buffer con el contenido de la imagen
  */
  async obtenerArchivoComoBuffer(fileId) {
    try {
      const response = await this.googleClient.drive.files.get({
        fileId,
        alt: "media"
      }, {
        responseType: "arraybuffer"
      });
      return Buffer.from(response.data);
    } catch (error) {
      this.logger.error(`Error descargando recurso de Drive (ID: ${fileId}):`, error);
      throw new Error(`No se pudo obtener la imagen ${fileId} desde Google Drive.`);
    }
  }
};
DriveDocsService = _ts_decorate([
  Injectable(),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof GoogleClientProvider === "undefined" ? Object : GoogleClientProvider
  ])
], DriveDocsService);

// src/compilador.controller.ts
import { Controller, Post, Body, Res, HttpStatus, HttpException } from "@nestjs/common";

// src/document-compiler.service.ts
import { Injectable as Injectable2, Logger as Logger2 } from "@nestjs/common";
import { Paragraph, TextRun, ImageRun, AlignmentType, HeadingLevel, TableOfContents, Header, Footer, PageNumber } from "docx";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
function _ts_metadata2(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata2, "_ts_metadata");
var DocumentCompilerService = class _DocumentCompilerService {
  static {
    __name(this, "DocumentCompilerService");
  }
  driveDocsService;
  logger = new Logger2(_DocumentCompilerService.name);
  constructor(driveDocsService) {
    this.driveDocsService = driveDocsService;
  }
  async obtenerBufferImagen(imgId, source = "drive") {
    if (!imgId) return null;
    try {
      if (source === "web") {
        const response = await axios.get(imgId, {
          responseType: "arraybuffer"
        });
        return Buffer.from(response.data, "binary");
      }
      if (source === "drive") {
        return await this.driveDocsService.obtenerArchivoComoBuffer(imgId);
      }
      return this.cargarImagenLocal(imgId);
    } catch (error) {
      this.logger.error(`\u274C Error obteniendo imagen [${imgId}] desde [${source}]: ${error.message}`);
      return null;
    }
  }
  async buildParagraph(data, config) {
    const runs = [];
    const itemsSeguros = Array.isArray(data) ? data : [];
    for (const item of itemsSeguros) {
      if (!item) continue;
      if (item.isPageNumber) {
        runs.push(new TextRun({
          children: [
            PageNumber.CURRENT
          ],
          font: item.font || "Arial",
          size: item.size || 22,
          bold: item.style === "strong"
        }));
      } else if (item.isTotalPages) {
        runs.push(new TextRun({
          children: [
            PageNumber.TOTAL_PAGES
          ],
          font: item.font || "Arial",
          size: item.size || 22,
          bold: item.style === "strong"
        }));
      } else if (item.img) {
        const source = item.imgSource || "drive";
        const bufferImagen = await this.obtenerBufferImagen(item.img, source);
        if (bufferImagen) {
          const tipoImagen = this.obtenerTipoImagen(bufferImagen);
          runs.push(new ImageRun({
            data: bufferImagen,
            transformation: {
              width: item.transformation?.width ?? 100,
              height: item.transformation?.height ?? 100
            },
            type: tipoImagen
          }));
        }
      } else {
        if (item.break) {
          runs.push(new TextRun({
            text: "",
            break: item.break
          }));
        }
        if (item.text || item.text === "") {
          runs.push(new TextRun({
            text: item.text || "",
            bold: item.style === "strong",
            font: item.font || "Arial",
            size: item.size || 22
          }));
        }
      }
    }
    const alignment = this.mapAlignment(config?.alignment);
    const heading = config && "heading" in config ? this.mapHeading(config.heading) : void 0;
    const indent = config && "indent" in config && config.indent ? {
      left: config.indent?.left
    } : void 0;
    const spacing = config && "spacing" in config ? config.spacing : void 0;
    return new Paragraph({
      children: runs,
      alignment,
      heading,
      indent,
      spacing
    });
  }
  async compilarJSON(dto) {
    const bloquesSeguros = Array.isArray(dto?.bloques) ? dto.bloques : [];
    const paragraphChildren = await Promise.all(bloquesSeguros.map(async (bloque) => {
      if (!bloque) return new Paragraph({});
      if (bloque.type === "toc") {
        const titulo = bloque.config?.title || "\xCDndice";
        return new TableOfContents(titulo, {
          hyperlink: true,
          headingStyleRange: "1-3"
        });
      }
      return this.buildParagraph(bloque.data || [], bloque.config);
    }));
    let headers = void 0;
    if (dto?.header && Array.isArray(dto.header.data)) {
      const headerParagraph = await this.buildParagraph(dto.header.data, {
        alignment: dto.header.alignment
      });
      headers = {
        default: new Header({
          children: [
            headerParagraph
          ]
        })
      };
    }
    let footers = void 0;
    if (dto?.footer && Array.isArray(dto.footer.data)) {
      const footerParagraph = await this.buildParagraph(dto.footer.data, {
        alignment: dto.footer.alignment
      });
      footers = {
        default: new Footer({
          children: [
            footerParagraph
          ]
        })
      };
    }
    return {
      children: paragraphChildren,
      headers,
      footers
    };
  }
  /**
   * Carga una imagen física del servidor para incrustarla en el Word
   */
  cargarImagenLocal(nombreImagen) {
    try {
      const ruta = path.join(process.cwd(), "assets", nombreImagen);
      if (!fs.existsSync(ruta)) {
        this.logger.warn(`\u26A0\uFE0F Imagen local no encontrada en la ruta: ${ruta}`);
        return null;
      }
      return fs.readFileSync(ruta);
    } catch (error) {
      this.logger.warn(`\u274C No se pudo cargar la imagen: ${nombreImagen}. Error: ${error.message}`);
      return null;
    }
  }
  mapAlignment(align) {
    switch (align) {
      case "left":
        return AlignmentType.LEFT;
      case "right":
        return AlignmentType.RIGHT;
      case "center":
        return AlignmentType.CENTER;
      case "justify":
        return AlignmentType.JUSTIFIED;
      case "distribute":
        return AlignmentType.DISTRIBUTE;
      default:
        return void 0;
    }
  }
  mapHeading(heading) {
    switch (heading) {
      case "Heading1":
        return HeadingLevel.HEADING_1;
      case "Heading2":
        return HeadingLevel.HEADING_2;
      case "Heading3":
        return HeadingLevel.HEADING_3;
      case "Heading4":
        return HeadingLevel.HEADING_4;
      default:
        return void 0;
    }
  }
  obtenerTipoImagen(buffer) {
    if (!buffer || buffer.length < 4) return "png";
    if (buffer[0] === 137 && buffer[1] === 80 && buffer[2] === 78 && buffer[3] === 71) {
      return "png";
    }
    if (buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) {
      return "jpg";
    }
    if (buffer[0] === 71 && buffer[1] === 73 && buffer[2] === 70) {
      return "gif";
    }
    if (buffer[0] === 66 && buffer[1] === 77) {
      return "bmp";
    }
    return "png";
  }
};
DocumentCompilerService = _ts_decorate2([
  Injectable2(),
  _ts_metadata2("design:type", Function),
  _ts_metadata2("design:paramtypes", [
    typeof DriveDocsService === "undefined" ? Object : DriveDocsService
  ])
], DocumentCompilerService);

// src/render-document.dto.ts
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsNumber, IsBoolean, Min } from "class-validator";
import { Type } from "class-transformer";
function _ts_decorate3(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate3, "_ts_decorate");
function _ts_metadata3(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata3, "_ts_metadata");
var TransformationConfig = class {
  static {
    __name(this, "TransformationConfig");
  }
  width;
  height;
};
_ts_decorate3([
  IsNumber(),
  Min(1),
  _ts_metadata3("design:type", Number)
], TransformationConfig.prototype, "width", void 0);
_ts_decorate3([
  IsNumber(),
  Min(1),
  _ts_metadata3("design:type", Number)
], TransformationConfig.prototype, "height", void 0);
var IndentConfig = class {
  static {
    __name(this, "IndentConfig");
  }
  left;
};
_ts_decorate3([
  IsOptional(),
  IsNumber(),
  _ts_metadata3("design:type", Number)
], IndentConfig.prototype, "left", void 0);
var SpacingConfig = class {
  static {
    __name(this, "SpacingConfig");
  }
  line;
  after;
};
_ts_decorate3([
  IsOptional(),
  IsNumber(),
  _ts_metadata3("design:type", Number)
], SpacingConfig.prototype, "line", void 0);
_ts_decorate3([
  IsOptional(),
  IsNumber(),
  _ts_metadata3("design:type", Number)
], SpacingConfig.prototype, "after", void 0);
var DataItem = class {
  static {
    __name(this, "DataItem");
  }
  size;
  text;
  font;
  break;
  style;
  img;
  // 🛡️ Ahora class-validator inspeccionará width y height sin borrarlos
  transformation;
  imgSource;
  isPageNumber;
  isTotalPages;
};
_ts_decorate3([
  IsOptional(),
  IsNumber(),
  _ts_metadata3("design:type", Number)
], DataItem.prototype, "size", void 0);
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "text", void 0);
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "font", void 0);
_ts_decorate3([
  IsOptional(),
  IsNumber(),
  _ts_metadata3("design:type", Number)
], DataItem.prototype, "break", void 0);
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "style", void 0);
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "img", void 0);
_ts_decorate3([
  IsOptional(),
  ValidateNested(),
  Type(() => TransformationConfig),
  _ts_metadata3("design:type", typeof TransformationConfig === "undefined" ? Object : TransformationConfig)
], DataItem.prototype, "transformation", void 0);
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "imgSource", void 0);
_ts_decorate3([
  IsOptional(),
  IsBoolean(),
  _ts_metadata3("design:type", Boolean)
], DataItem.prototype, "isPageNumber", void 0);
_ts_decorate3([
  IsOptional(),
  IsBoolean(),
  _ts_metadata3("design:type", Boolean)
], DataItem.prototype, "isTotalPages", void 0);
var ParagraphConfig = class {
  static {
    __name(this, "ParagraphConfig");
  }
  title;
  heading;
  alignment;
  // 🛡️ Ahora class-validator inspeccionará left, line y after sin borrarlos
  indent;
  spacing;
};
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], ParagraphConfig.prototype, "title", void 0);
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], ParagraphConfig.prototype, "heading", void 0);
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], ParagraphConfig.prototype, "alignment", void 0);
_ts_decorate3([
  IsOptional(),
  ValidateNested(),
  Type(() => IndentConfig),
  _ts_metadata3("design:type", typeof IndentConfig === "undefined" ? Object : IndentConfig)
], ParagraphConfig.prototype, "indent", void 0);
_ts_decorate3([
  IsOptional(),
  ValidateNested(),
  Type(() => SpacingConfig),
  _ts_metadata3("design:type", typeof SpacingConfig === "undefined" ? Object : SpacingConfig)
], ParagraphConfig.prototype, "spacing", void 0);
var BloqueContenido = class {
  static {
    __name(this, "BloqueContenido");
  }
  type;
  data = [];
  config;
};
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], BloqueContenido.prototype, "type", void 0);
_ts_decorate3([
  IsArray(),
  ValidateNested({
    each: true
  }),
  Type(() => DataItem),
  _ts_metadata3("design:type", Array)
], BloqueContenido.prototype, "data", void 0);
_ts_decorate3([
  IsOptional(),
  ValidateNested(),
  Type(() => ParagraphConfig),
  _ts_metadata3("design:type", typeof ParagraphConfig === "undefined" ? Object : ParagraphConfig)
], BloqueContenido.prototype, "config", void 0);
var PageConfig = class {
  static {
    __name(this, "PageConfig");
  }
  data = [];
  alignment;
};
_ts_decorate3([
  IsArray(),
  ValidateNested({
    each: true
  }),
  Type(() => DataItem),
  _ts_metadata3("design:type", Array)
], PageConfig.prototype, "data", void 0);
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], PageConfig.prototype, "alignment", void 0);
var RenderDocumentDto = class {
  static {
    __name(this, "RenderDocumentDto");
  }
  carpetaId;
  nombreArchivo;
  bloques = [];
  header;
  footer;
};
_ts_decorate3([
  IsString(),
  IsNotEmpty(),
  _ts_metadata3("design:type", String)
], RenderDocumentDto.prototype, "carpetaId", void 0);
_ts_decorate3([
  IsString(),
  IsNotEmpty(),
  _ts_metadata3("design:type", String)
], RenderDocumentDto.prototype, "nombreArchivo", void 0);
_ts_decorate3([
  IsArray(),
  ValidateNested({
    each: true
  }),
  Type(() => BloqueContenido),
  _ts_metadata3("design:type", Array)
], RenderDocumentDto.prototype, "bloques", void 0);
_ts_decorate3([
  IsOptional(),
  ValidateNested(),
  Type(() => PageConfig),
  _ts_metadata3("design:type", typeof PageConfig === "undefined" ? Object : PageConfig)
], RenderDocumentDto.prototype, "header", void 0);
_ts_decorate3([
  IsOptional(),
  ValidateNested(),
  Type(() => PageConfig),
  _ts_metadata3("design:type", typeof PageConfig === "undefined" ? Object : PageConfig)
], RenderDocumentDto.prototype, "footer", void 0);

// src/compilador.controller.ts
function _ts_decorate4(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate4, "_ts_decorate");
function _ts_metadata4(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata4, "_ts_metadata");
function _ts_param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param, "_ts_param");
var CompiladorController = class {
  static {
    __name(this, "CompiladorController");
  }
  compilerService;
  driveDocsService;
  constructor(compilerService, driveDocsService) {
    this.compilerService = compilerService;
    this.driveDocsService = driveDocsService;
  }
  async generarPdfDinamico(dto, res) {
    try {
      const estructuraDocx = await this.compilerService.compilarJSON(dto);
      const pdfBuffer = await this.driveDocsService.generarPdfDesdeEstructura(estructuraDocx, dto.nombreArchivo, dto.carpetaId);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${dto.nombreArchivo}.pdf"`);
      res.setHeader("Content-Length", pdfBuffer.length.toString());
      res.end(pdfBuffer);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Error al compilar y generar el documento din\xE1mico.",
        details: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};
_ts_decorate4([
  Post("run-engine"),
  _ts_param(0, Body()),
  _ts_param(1, Res()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof RenderDocumentDto === "undefined" ? Object : RenderDocumentDto,
    typeof Response === "undefined" ? Object : Response
  ]),
  _ts_metadata4("design:returntype", Promise)
], CompiladorController.prototype, "generarPdfDinamico", null);
CompiladorController = _ts_decorate4([
  Controller("builder-document"),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof DocumentCompilerService === "undefined" ? Object : DocumentCompilerService,
    typeof DriveDocsService === "undefined" ? Object : DriveDocsService
  ])
], CompiladorController);

// src/docs.module.ts
function _ts_decorate5(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate5, "_ts_decorate");
var DocsModule = class {
  static {
    __name(this, "DocsModule");
  }
};
DocsModule = _ts_decorate5([
  Module({
    controllers: [
      CompiladorController
    ],
    providers: [
      DriveDocsService,
      DocumentCompilerService
    ],
    exports: [
      DriveDocsService,
      DocumentCompilerService
    ]
  })
], DocsModule);
export {
  DocsModule,
  DriveDocsService
};
//# sourceMappingURL=index.mjs.map