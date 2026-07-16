"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DocsModule: () => DocsModule,
  DriveDocsService: () => DriveDocsService
});
module.exports = __toCommonJS(index_exports);

// src/docs.module.ts
var import_common4 = require("@nestjs/common");

// src/drive-docs.service.ts
var import_common = require("@nestjs/common");
var import_auth = require("@spreadsheet/auth");
var import_stream = require("stream");
var import_docx = require("docx");
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
  logger = new import_common.Logger(_DriveDocsService.name);
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
    const bufferStream = import_stream.Readable.from(Buffer.from(content1));
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
    const doc = new import_docx.Document({
      sections: [
        payload
      ]
    });
    return await import_docx.Packer.toBuffer(doc);
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
  (0, import_common.Injectable)(),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof import_auth.GoogleClientProvider === "undefined" ? Object : import_auth.GoogleClientProvider
  ])
], DriveDocsService);

// src/compilador.controller.ts
var import_common3 = require("@nestjs/common");

// src/document-compiler.service.ts
var import_common2 = require("@nestjs/common");
var import_docx2 = require("docx");
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var import_axios = __toESM(require("axios"));
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
  logger = new import_common2.Logger(_DocumentCompilerService.name);
  constructor(driveDocsService) {
    this.driveDocsService = driveDocsService;
  }
  async obtenerBufferImagen(imgId, source = "drive") {
    if (!imgId) return null;
    try {
      if (source === "web") {
        const response = await import_axios.default.get(imgId, {
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
        runs.push(new import_docx2.TextRun({
          children: [
            import_docx2.PageNumber.CURRENT
          ],
          font: item.font || "Arial",
          size: item.size || 22,
          bold: item.style === "strong"
        }));
      } else if (item.isTotalPages) {
        runs.push(new import_docx2.TextRun({
          children: [
            import_docx2.PageNumber.TOTAL_PAGES
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
          runs.push(new import_docx2.ImageRun({
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
          runs.push(new import_docx2.TextRun({
            text: "",
            break: item.break
          }));
        }
        if (item.text || item.text === "") {
          runs.push(new import_docx2.TextRun({
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
    return new import_docx2.Paragraph({
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
      if (!bloque) return new import_docx2.Paragraph({});
      if (bloque.type === "toc") {
        const titulo = bloque.config?.title || "\xCDndice";
        return new import_docx2.TableOfContents(titulo, {
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
        default: new import_docx2.Header({
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
        default: new import_docx2.Footer({
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
        return import_docx2.AlignmentType.LEFT;
      case "right":
        return import_docx2.AlignmentType.RIGHT;
      case "center":
        return import_docx2.AlignmentType.CENTER;
      case "justify":
        return import_docx2.AlignmentType.JUSTIFIED;
      case "distribute":
        return import_docx2.AlignmentType.DISTRIBUTE;
      default:
        return void 0;
    }
  }
  mapHeading(heading) {
    switch (heading) {
      case "Heading1":
        return import_docx2.HeadingLevel.HEADING_1;
      case "Heading2":
        return import_docx2.HeadingLevel.HEADING_2;
      case "Heading3":
        return import_docx2.HeadingLevel.HEADING_3;
      case "Heading4":
        return import_docx2.HeadingLevel.HEADING_4;
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
  (0, import_common2.Injectable)(),
  _ts_metadata2("design:type", Function),
  _ts_metadata2("design:paramtypes", [
    typeof DriveDocsService === "undefined" ? Object : DriveDocsService
  ])
], DocumentCompilerService);

// src/render-document.dto.ts
var import_class_validator = require("class-validator");
var import_class_transformer = require("class-transformer");
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
  (0, import_class_validator.IsNumber)(),
  (0, import_class_validator.Min)(1),
  _ts_metadata3("design:type", Number)
], TransformationConfig.prototype, "width", void 0);
_ts_decorate3([
  (0, import_class_validator.IsNumber)(),
  (0, import_class_validator.Min)(1),
  _ts_metadata3("design:type", Number)
], TransformationConfig.prototype, "height", void 0);
var IndentConfig = class {
  static {
    __name(this, "IndentConfig");
  }
  left;
};
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsNumber)(),
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
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsNumber)(),
  _ts_metadata3("design:type", Number)
], SpacingConfig.prototype, "line", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsNumber)(),
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
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsNumber)(),
  _ts_metadata3("design:type", Number)
], DataItem.prototype, "size", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "text", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "font", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsNumber)(),
  _ts_metadata3("design:type", Number)
], DataItem.prototype, "break", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "style", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "img", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.ValidateNested)(),
  (0, import_class_transformer.Type)(() => TransformationConfig),
  _ts_metadata3("design:type", typeof TransformationConfig === "undefined" ? Object : TransformationConfig)
], DataItem.prototype, "transformation", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "imgSource", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsBoolean)(),
  _ts_metadata3("design:type", Boolean)
], DataItem.prototype, "isPageNumber", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsBoolean)(),
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
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  _ts_metadata3("design:type", String)
], ParagraphConfig.prototype, "title", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  _ts_metadata3("design:type", String)
], ParagraphConfig.prototype, "heading", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  _ts_metadata3("design:type", String)
], ParagraphConfig.prototype, "alignment", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.ValidateNested)(),
  (0, import_class_transformer.Type)(() => IndentConfig),
  _ts_metadata3("design:type", typeof IndentConfig === "undefined" ? Object : IndentConfig)
], ParagraphConfig.prototype, "indent", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.ValidateNested)(),
  (0, import_class_transformer.Type)(() => SpacingConfig),
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
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  _ts_metadata3("design:type", String)
], BloqueContenido.prototype, "type", void 0);
_ts_decorate3([
  (0, import_class_validator.IsArray)(),
  (0, import_class_validator.ValidateNested)({
    each: true
  }),
  (0, import_class_transformer.Type)(() => DataItem),
  _ts_metadata3("design:type", Array)
], BloqueContenido.prototype, "data", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.ValidateNested)(),
  (0, import_class_transformer.Type)(() => ParagraphConfig),
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
  (0, import_class_validator.IsArray)(),
  (0, import_class_validator.ValidateNested)({
    each: true
  }),
  (0, import_class_transformer.Type)(() => DataItem),
  _ts_metadata3("design:type", Array)
], PageConfig.prototype, "data", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
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
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.IsNotEmpty)(),
  _ts_metadata3("design:type", String)
], RenderDocumentDto.prototype, "carpetaId", void 0);
_ts_decorate3([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.IsNotEmpty)(),
  _ts_metadata3("design:type", String)
], RenderDocumentDto.prototype, "nombreArchivo", void 0);
_ts_decorate3([
  (0, import_class_validator.IsArray)(),
  (0, import_class_validator.ValidateNested)({
    each: true
  }),
  (0, import_class_transformer.Type)(() => BloqueContenido),
  _ts_metadata3("design:type", Array)
], RenderDocumentDto.prototype, "bloques", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.ValidateNested)(),
  (0, import_class_transformer.Type)(() => PageConfig),
  _ts_metadata3("design:type", typeof PageConfig === "undefined" ? Object : PageConfig)
], RenderDocumentDto.prototype, "header", void 0);
_ts_decorate3([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.ValidateNested)(),
  (0, import_class_transformer.Type)(() => PageConfig),
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
      throw new import_common3.HttpException({
        status: import_common3.HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Error al compilar y generar el documento din\xE1mico.",
        details: error.message
      }, import_common3.HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};
_ts_decorate4([
  (0, import_common3.Post)("run-engine"),
  _ts_param(0, (0, import_common3.Body)()),
  _ts_param(1, (0, import_common3.Res)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof RenderDocumentDto === "undefined" ? Object : RenderDocumentDto,
    typeof Response === "undefined" ? Object : Response
  ]),
  _ts_metadata4("design:returntype", Promise)
], CompiladorController.prototype, "generarPdfDinamico", null);
CompiladorController = _ts_decorate4([
  (0, import_common3.Controller)("builder-document"),
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
  (0, import_common4.Module)({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DocsModule,
  DriveDocsService
});
//# sourceMappingURL=index.js.map