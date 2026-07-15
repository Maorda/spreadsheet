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
  async obtenerBufferImagen(imgId, source) {
    if (source === "web") {
      try {
        const response = await import_axios.default.get(imgId, {
          responseType: "arraybuffer"
        });
        return Buffer.from(response.data, "binary");
      } catch (error) {
        return null;
      }
    }
    if (source === "drive") {
      return await this.driveDocsService.obtenerArchivoComoBuffer(imgId);
    }
    return this.cargarImagenLocal(imgId);
  }
  /**
   * Traduce el JSON dinámico recibido por el body a la estructura nativa ISectionOptions de docx
   */
  compilarJSON(bloques) {
    const paragraphChildren = bloques.map((bloque) => {
      const runs = [];
      for (const item of bloque.data) {
        if (item.img) {
          const bufferImagen = this.cargarImagenLocal(item.img);
          if (bufferImagen) {
            const extension = item.img.split(".").pop()?.toLowerCase() || "png";
            const imageType = extension === "jpeg" ? "jpg" : extension;
            runs.push(new import_docx2.ImageRun({
              data: bufferImagen,
              // Indicamos explícitamente el tipo para satisfacer la interfaz SvgMediaOptions & CoreImageOptions
              type: imageType,
              transformation: {
                width: item.transformation?.width ?? 50,
                height: item.transformation?.height ?? 50
              }
            }));
          }
          if (item.break) {
            runs.push(new import_docx2.TextRun({
              text: "",
              break: item.break
            }));
          }
        } else {
          runs.push(new import_docx2.TextRun({
            text: item.text,
            bold: item.style === "strong",
            break: item.break,
            font: "Arial",
            size: 22
          }));
        }
      }
      return new import_docx2.Paragraph({
        children: runs,
        alignment: this.mapAlignment(bloque.config?.alignment),
        heading: this.mapHeading(bloque.config?.heading),
        indent: bloque.config?.indent ? {
          left: bloque.config.indent.left
        } : void 0,
        spacing: bloque.config?.spacing ? {
          line: bloque.config.spacing.line,
          after: bloque.config.spacing.after
        } : void 0
      });
    });
    return {
      children: paragraphChildren
    };
  }
  /**
   * Carga una imagen física del servidor para incrustarla en el Word
   */
  cargarImagenLocal(nombreImagen) {
    try {
      const ruta = path.join(process.cwd(), "assets", nombreImagen);
      return fs.readFileSync(ruta);
    } catch (error) {
      this.logger.warn(`No se pudo cargar la imagen: ${nombreImagen}. Error: ${error.message}`);
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
};
DocumentCompilerService = _ts_decorate2([
  (0, import_common2.Injectable)(),
  _ts_metadata2("design:type", Function),
  _ts_metadata2("design:paramtypes", [
    typeof DriveDocsService === "undefined" ? Object : DriveDocsService
  ])
], DocumentCompilerService);

// ../../node_modules/class-validator/esm5/metadata/ValidationMetadata.js
var ValidationMetadata = (
  /** @class */
  /* @__PURE__ */ (function() {
    function ValidationMetadata2(args) {
      this.groups = [];
      this.each = false;
      this.context = void 0;
      this.type = args.type;
      this.name = args.name;
      this.target = args.target;
      this.propertyName = args.propertyName;
      this.constraints = args === null || args === void 0 ? void 0 : args.constraints;
      this.constraintCls = args.constraintCls;
      this.validationTypeOptions = args.validationTypeOptions;
      if (args.validationOptions) {
        this.message = args.validationOptions.message;
        this.groups = args.validationOptions.groups;
        this.always = args.validationOptions.always;
        this.each = args.validationOptions.each;
        this.context = args.validationOptions.context;
        this.validateIf = args.validationOptions.validateIf;
      }
    }
    __name(ValidationMetadata2, "ValidationMetadata");
    return ValidationMetadata2;
  })()
);

// ../../node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js
var ValidationSchemaToMetadataTransformer = (
  /** @class */
  (function() {
    function ValidationSchemaToMetadataTransformer2() {
    }
    __name(ValidationSchemaToMetadataTransformer2, "ValidationSchemaToMetadataTransformer");
    ValidationSchemaToMetadataTransformer2.prototype.transform = function(schema) {
      var metadatas = [];
      Object.keys(schema.properties).forEach(function(property) {
        schema.properties[property].forEach(function(validation) {
          var validationOptions = {
            message: validation.message,
            groups: validation.groups,
            always: validation.always,
            each: validation.each
          };
          var args = {
            type: validation.type,
            name: validation.name,
            target: schema.name,
            propertyName: property,
            constraints: validation.constraints,
            validationTypeOptions: validation.options,
            validationOptions
          };
          metadatas.push(new ValidationMetadata(args));
        });
      });
      return metadatas;
    };
    return ValidationSchemaToMetadataTransformer2;
  })()
);

// ../../node_modules/class-validator/esm5/utils/get-global.util.js
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof self !== "undefined") {
    return self;
  }
}
__name(getGlobal, "getGlobal");

// ../../node_modules/class-validator/esm5/metadata/MetadataStorage.js
var __values = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: /* @__PURE__ */ __name(function() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }, "next")
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var MetadataStorage = (
  /** @class */
  (function() {
    function MetadataStorage3() {
      this.validationMetadatas = /* @__PURE__ */ new Map();
      this.constraintMetadatas = /* @__PURE__ */ new Map();
    }
    __name(MetadataStorage3, "MetadataStorage");
    Object.defineProperty(MetadataStorage3.prototype, "hasValidationMetaData", {
      get: /* @__PURE__ */ __name(function() {
        return !!this.validationMetadatas.size;
      }, "get"),
      enumerable: false,
      configurable: true
    });
    MetadataStorage3.prototype.addValidationSchema = function(schema) {
      var _this = this;
      var validationMetadatas = new ValidationSchemaToMetadataTransformer().transform(schema);
      validationMetadatas.forEach(function(validationMetadata) {
        return _this.addValidationMetadata(validationMetadata);
      });
    };
    MetadataStorage3.prototype.addValidationMetadata = function(metadata) {
      var existingMetadata = this.validationMetadatas.get(metadata.target);
      if (existingMetadata) {
        existingMetadata.push(metadata);
      } else {
        this.validationMetadatas.set(metadata.target, [
          metadata
        ]);
      }
    };
    MetadataStorage3.prototype.addConstraintMetadata = function(metadata) {
      var existingMetadata = this.constraintMetadatas.get(metadata.target);
      if (existingMetadata) {
        existingMetadata.push(metadata);
      } else {
        this.constraintMetadatas.set(metadata.target, [
          metadata
        ]);
      }
    };
    MetadataStorage3.prototype.groupByPropertyName = function(metadata) {
      var grouped = {};
      metadata.forEach(function(metadata2) {
        if (!grouped[metadata2.propertyName]) grouped[metadata2.propertyName] = [];
        grouped[metadata2.propertyName].push(metadata2);
      });
      return grouped;
    };
    MetadataStorage3.prototype.getTargetValidationMetadatas = function(targetConstructor, targetSchema, always, strictGroups, groups) {
      var e_1, _a;
      var includeMetadataBecauseOfAlwaysOption = /* @__PURE__ */ __name(function(metadata) {
        if (typeof metadata.always !== "undefined") return metadata.always;
        if (metadata.groups && metadata.groups.length) return false;
        return always;
      }, "includeMetadataBecauseOfAlwaysOption");
      var excludeMetadataBecauseOfStrictGroupsOption = /* @__PURE__ */ __name(function(metadata) {
        if (strictGroups) {
          if (!groups || !groups.length) {
            if (metadata.groups && metadata.groups.length) return true;
          }
        }
        return false;
      }, "excludeMetadataBecauseOfStrictGroupsOption");
      var filteredForOriginalMetadatasSearch = this.validationMetadatas.get(targetConstructor) || [];
      var originalMetadatas = filteredForOriginalMetadatasSearch.filter(function(metadata) {
        if (metadata.target !== targetConstructor && metadata.target !== targetSchema) return false;
        if (includeMetadataBecauseOfAlwaysOption(metadata)) return true;
        if (excludeMetadataBecauseOfStrictGroupsOption(metadata)) return false;
        if (groups && groups.length > 0) return metadata.groups && !!metadata.groups.find(function(group) {
          return groups.indexOf(group) !== -1;
        });
        return true;
      });
      var filteredForInheritedMetadatasSearch = [];
      try {
        for (var _b = __values(this.validationMetadatas.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
          if (targetConstructor.prototype instanceof key) {
            filteredForInheritedMetadatasSearch.push.apply(filteredForInheritedMetadatasSearch, __spreadArray([], __read(value), false));
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      var inheritedMetadatas = filteredForInheritedMetadatasSearch.filter(function(metadata) {
        if (typeof metadata.target === "string") return false;
        if (metadata.target === targetConstructor) return false;
        if (metadata.target instanceof Function && !(targetConstructor.prototype instanceof metadata.target)) return false;
        if (includeMetadataBecauseOfAlwaysOption(metadata)) return true;
        if (excludeMetadataBecauseOfStrictGroupsOption(metadata)) return false;
        if (groups && groups.length > 0) return metadata.groups && !!metadata.groups.find(function(group) {
          return groups.indexOf(group) !== -1;
        });
        return true;
      });
      var uniqueInheritedMetadatas = inheritedMetadatas.filter(function(inheritedMetadata) {
        return !originalMetadatas.find(function(originalMetadata) {
          return originalMetadata.propertyName === inheritedMetadata.propertyName && originalMetadata.type === inheritedMetadata.type;
        });
      });
      return originalMetadatas.concat(uniqueInheritedMetadatas);
    };
    MetadataStorage3.prototype.getTargetValidatorConstraints = function(target) {
      return this.constraintMetadatas.get(target) || [];
    };
    return MetadataStorage3;
  })()
);
function getMetadataStorage() {
  var global2 = getGlobal();
  if (!global2.classValidatorMetadataStorage) {
    global2.classValidatorMetadataStorage = new MetadataStorage();
  }
  return global2.classValidatorMetadataStorage;
}
__name(getMetadataStorage, "getMetadataStorage");

// ../../node_modules/class-validator/esm5/validation/ValidationTypes.js
var ValidationTypes = (
  /** @class */
  (function() {
    function ValidationTypes2() {
    }
    __name(ValidationTypes2, "ValidationTypes");
    ValidationTypes2.isValid = function(type) {
      var _this = this;
      return type !== "isValid" && type !== "getMessage" && Object.keys(this).map(function(key) {
        return _this[key];
      }).indexOf(type) !== -1;
    };
    ValidationTypes2.CUSTOM_VALIDATION = "customValidation";
    ValidationTypes2.NESTED_VALIDATION = "nestedValidation";
    ValidationTypes2.PROMISE_VALIDATION = "promiseValidation";
    ValidationTypes2.CONDITIONAL_VALIDATION = "conditionalValidation";
    ValidationTypes2.WHITELIST = "whitelistValidation";
    ValidationTypes2.IS_DEFINED = "isDefined";
    return ValidationTypes2;
  })()
);

// ../../node_modules/class-validator/esm5/container.js
var defaultContainer = new /** @class */
((function() {
  function class_1() {
    this.instances = [];
  }
  __name(class_1, "class_1");
  class_1.prototype.get = function(someClass) {
    var instance = this.instances.find(function(instance2) {
      return instance2.type === someClass;
    });
    if (!instance) {
      instance = {
        type: someClass,
        object: new someClass()
      };
      this.instances.push(instance);
    }
    return instance.object;
  };
  return class_1;
})())();
var userContainer;
var userContainerOptions;
function getFromContainer(someClass) {
  if (userContainer) {
    try {
      var instance = userContainer.get(someClass);
      if (instance) return instance;
      if (!userContainerOptions || !userContainerOptions.fallback) return instance;
    } catch (error) {
      if (!userContainerOptions || !userContainerOptions.fallbackOnErrors) throw error;
    }
  }
  return defaultContainer.get(someClass);
}
__name(getFromContainer, "getFromContainer");

// ../../node_modules/class-validator/esm5/metadata/ConstraintMetadata.js
var ConstraintMetadata = (
  /** @class */
  (function() {
    function ConstraintMetadata2(target, name, async) {
      if (async === void 0) {
        async = false;
      }
      this.target = target;
      this.name = name;
      this.async = async;
    }
    __name(ConstraintMetadata2, "ConstraintMetadata");
    Object.defineProperty(ConstraintMetadata2.prototype, "instance", {
      // -------------------------------------------------------------------------
      // Accessors
      // -------------------------------------------------------------------------
      /**
       * Instance of the target custom validation class which performs validation.
       */
      get: /* @__PURE__ */ __name(function() {
        return getFromContainer(this.target);
      }, "get"),
      enumerable: false,
      configurable: true
    });
    return ConstraintMetadata2;
  })()
);

// ../../node_modules/class-validator/esm5/register-decorator.js
function registerDecorator(options) {
  var constraintCls;
  if (options.validator instanceof Function) {
    constraintCls = options.validator;
    var constraintClasses = getFromContainer(MetadataStorage).getTargetValidatorConstraints(options.validator);
    if (constraintClasses.length > 1) {
      throw "More than one implementation of ValidatorConstraintInterface found for validator on: ".concat(options.target.name, ":").concat(options.propertyName);
    }
  } else {
    var validator_1 = options.validator;
    constraintCls = /** @class */
    (function() {
      function CustomConstraint() {
      }
      __name(CustomConstraint, "CustomConstraint");
      CustomConstraint.prototype.validate = function(value, validationArguments) {
        return validator_1.validate(value, validationArguments);
      };
      CustomConstraint.prototype.defaultMessage = function(validationArguments) {
        if (validator_1.defaultMessage) {
          return validator_1.defaultMessage(validationArguments);
        }
        return "";
      };
      return CustomConstraint;
    })();
    getMetadataStorage().addConstraintMetadata(new ConstraintMetadata(constraintCls, options.name, options.async));
  }
  var validationMetadataArgs = {
    type: options.name && ValidationTypes.isValid(options.name) ? options.name : ValidationTypes.CUSTOM_VALIDATION,
    name: options.name,
    target: options.target,
    propertyName: options.propertyName,
    validationOptions: options.options,
    constraintCls,
    constraints: options.constraints
  };
  getMetadataStorage().addValidationMetadata(new ValidationMetadata(validationMetadataArgs));
}
__name(registerDecorator, "registerDecorator");

// ../../node_modules/class-validator/esm5/decorator/common/ValidateBy.js
function buildMessage(impl, validationOptions) {
  return function(validationArguments) {
    var eachPrefix = validationOptions && validationOptions.each ? "each value in " : "";
    return impl(eachPrefix, validationArguments);
  };
}
__name(buildMessage, "buildMessage");
function ValidateBy(options, validationOptions) {
  return function(object, propertyName) {
    registerDecorator({
      name: options.name,
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: options.constraints,
      validator: options.validator
    });
  };
}
__name(ValidateBy, "ValidateBy");

// ../../node_modules/class-validator/esm5/decorator/common/IsOptional.js
var IS_OPTIONAL = "isOptional";
function IsOptional(validationOptions) {
  return function(object, propertyName) {
    var args = {
      type: ValidationTypes.CONDITIONAL_VALIDATION,
      name: IS_OPTIONAL,
      target: object.constructor,
      propertyName,
      constraints: [
        function(object2, value) {
          return object2[propertyName] !== null && object2[propertyName] !== void 0;
        }
      ],
      validationOptions
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
  };
}
__name(IsOptional, "IsOptional");

// ../../node_modules/class-validator/esm5/decorator/common/ValidateNested.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function ValidateNested(validationOptions) {
  var opts = __assign({}, validationOptions);
  var eachPrefix = opts.each ? "each value in " : "";
  opts.message = opts.message || eachPrefix + "nested property $property must be either object or array";
  return function(object, propertyName) {
    var args = {
      type: ValidationTypes.NESTED_VALIDATION,
      target: object.constructor,
      propertyName,
      validationOptions: opts
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
  };
}
__name(ValidateNested, "ValidateNested");

// ../../node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js
var IS_NOT_EMPTY = "isNotEmpty";
function isNotEmpty(value) {
  return value !== "" && value !== null && value !== void 0;
}
__name(isNotEmpty, "isNotEmpty");
function IsNotEmpty(validationOptions) {
  return ValidateBy({
    name: IS_NOT_EMPTY,
    validator: {
      validate: /* @__PURE__ */ __name(function(value, args) {
        return isNotEmpty(value);
      }, "validate"),
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property should not be empty";
      }, validationOptions)
    }
  }, validationOptions);
}
__name(IsNotEmpty, "IsNotEmpty");

// ../../node_modules/class-validator/esm5/decorator/typechecker/IsNumber.js
var IS_NUMBER = "isNumber";
function isNumber(value, options) {
  if (options === void 0) {
    options = {};
  }
  if (typeof value !== "number") {
    return false;
  }
  if (value === Infinity || value === -Infinity) {
    return !!options.allowInfinity;
  }
  if (Number.isNaN(value)) {
    return !!options.allowNaN;
  }
  if (options.maxDecimalPlaces !== void 0) {
    var decimalPlaces = 0;
    if (value % 1 !== 0) {
      decimalPlaces = value.toString().split(".")[1].length;
    }
    if (decimalPlaces > options.maxDecimalPlaces) {
      return false;
    }
  }
  return Number.isFinite(value);
}
__name(isNumber, "isNumber");
function IsNumber(options, validationOptions) {
  if (options === void 0) {
    options = {};
  }
  return ValidateBy({
    name: IS_NUMBER,
    constraints: [
      options
    ],
    validator: {
      validate: /* @__PURE__ */ __name(function(value, args) {
        return isNumber(value, args === null || args === void 0 ? void 0 : args.constraints[0]);
      }, "validate"),
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be a number conforming to the specified constraints";
      }, validationOptions)
    }
  }, validationOptions);
}
__name(IsNumber, "IsNumber");

// ../../node_modules/class-validator/esm5/decorator/typechecker/IsString.js
var IS_STRING = "isString";
function isString(value) {
  return value instanceof String || typeof value === "string";
}
__name(isString, "isString");
function IsString(validationOptions) {
  return ValidateBy({
    name: IS_STRING,
    validator: {
      validate: /* @__PURE__ */ __name(function(value, args) {
        return isString(value);
      }, "validate"),
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be a string";
      }, validationOptions)
    }
  }, validationOptions);
}
__name(IsString, "IsString");

// ../../node_modules/class-validator/esm5/decorator/typechecker/IsArray.js
var IS_ARRAY = "isArray";
function isArray(value) {
  return Array.isArray(value);
}
__name(isArray, "isArray");
function IsArray(validationOptions) {
  return ValidateBy({
    name: IS_ARRAY,
    validator: {
      validate: /* @__PURE__ */ __name(function(value, args) {
        return isArray(value);
      }, "validate"),
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be an array";
      }, validationOptions)
    }
  }, validationOptions);
}
__name(IsArray, "IsArray");

// ../../node_modules/class-validator/esm5/decorator/typechecker/IsObject.js
var IS_OBJECT = "isObject";
function isObject(value) {
  return value != null && (typeof value === "object" || typeof value === "function") && !Array.isArray(value);
}
__name(isObject, "isObject");
function IsObject(validationOptions) {
  return ValidateBy({
    name: IS_OBJECT,
    validator: {
      validate: /* @__PURE__ */ __name(function(value, args) {
        return isObject(value);
      }, "validate"),
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property must be an object";
      }, validationOptions)
    }
  }, validationOptions);
}
__name(IsObject, "IsObject");

// ../../node_modules/class-transformer/esm5/enums/transformation-type.enum.js
var TransformationType;
(function(TransformationType2) {
  TransformationType2[TransformationType2["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
  TransformationType2[TransformationType2["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
  TransformationType2[TransformationType2["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
})(TransformationType || (TransformationType = {}));

// ../../node_modules/class-transformer/esm5/MetadataStorage.js
var MetadataStorage2 = (
  /** @class */
  (function() {
    function MetadataStorage3() {
      this._typeMetadatas = /* @__PURE__ */ new Map();
      this._transformMetadatas = /* @__PURE__ */ new Map();
      this._exposeMetadatas = /* @__PURE__ */ new Map();
      this._excludeMetadatas = /* @__PURE__ */ new Map();
      this._ancestorsMap = /* @__PURE__ */ new Map();
    }
    __name(MetadataStorage3, "MetadataStorage");
    MetadataStorage3.prototype.addTypeMetadata = function(metadata) {
      if (!this._typeMetadatas.has(metadata.target)) {
        this._typeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage3.prototype.addTransformMetadata = function(metadata) {
      if (!this._transformMetadatas.has(metadata.target)) {
        this._transformMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
        this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
      }
      this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
    };
    MetadataStorage3.prototype.addExposeMetadata = function(metadata) {
      if (!this._exposeMetadatas.has(metadata.target)) {
        this._exposeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage3.prototype.addExcludeMetadata = function(metadata) {
      if (!this._excludeMetadatas.has(metadata.target)) {
        this._excludeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage3.prototype.findTransformMetadatas = function(target, propertyName, transformationType) {
      return this.findMetadatas(this._transformMetadatas, target, propertyName).filter(function(metadata) {
        if (!metadata.options) return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true) return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      });
    };
    MetadataStorage3.prototype.findExcludeMetadata = function(target, propertyName) {
      return this.findMetadata(this._excludeMetadatas, target, propertyName);
    };
    MetadataStorage3.prototype.findExposeMetadata = function(target, propertyName) {
      return this.findMetadata(this._exposeMetadatas, target, propertyName);
    };
    MetadataStorage3.prototype.findExposeMetadataByCustomName = function(target, name) {
      return this.getExposedMetadatas(target).find(function(metadata) {
        return metadata.options && metadata.options.name === name;
      });
    };
    MetadataStorage3.prototype.findTypeMetadata = function(target, propertyName) {
      return this.findMetadata(this._typeMetadatas, target, propertyName);
    };
    MetadataStorage3.prototype.getStrategy = function(target) {
      var excludeMap = this._excludeMetadatas.get(target);
      var exclude = excludeMap && excludeMap.get(void 0);
      var exposeMap = this._exposeMetadatas.get(target);
      var expose = exposeMap && exposeMap.get(void 0);
      if (exclude && expose || !exclude && !expose) return "none";
      return exclude ? "excludeAll" : "exposeAll";
    };
    MetadataStorage3.prototype.getExposedMetadatas = function(target) {
      return this.getMetadata(this._exposeMetadatas, target);
    };
    MetadataStorage3.prototype.getExcludedMetadatas = function(target) {
      return this.getMetadata(this._excludeMetadatas, target);
    };
    MetadataStorage3.prototype.getExposedProperties = function(target, transformationType) {
      return this.getExposedMetadatas(target).filter(function(metadata) {
        if (!metadata.options) return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true) return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      }).map(function(metadata) {
        return metadata.propertyName;
      });
    };
    MetadataStorage3.prototype.getExcludedProperties = function(target, transformationType) {
      return this.getExcludedMetadatas(target).filter(function(metadata) {
        if (!metadata.options) return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true) return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      }).map(function(metadata) {
        return metadata.propertyName;
      });
    };
    MetadataStorage3.prototype.clear = function() {
      this._typeMetadatas.clear();
      this._exposeMetadatas.clear();
      this._excludeMetadatas.clear();
      this._ancestorsMap.clear();
    };
    MetadataStorage3.prototype.getMetadata = function(metadatas, target) {
      var metadataFromTargetMap = metadatas.get(target);
      var metadataFromTarget;
      if (metadataFromTargetMap) {
        metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function(meta) {
          return meta.propertyName !== void 0;
        });
      }
      var metadataFromAncestors = [];
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function(meta) {
            return meta.propertyName !== void 0;
          });
          metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
        }
      }
      return metadataFromAncestors.concat(metadataFromTarget || []);
    };
    MetadataStorage3.prototype.findMetadata = function(metadatas, target, propertyName) {
      var metadataFromTargetMap = metadatas.get(target);
      if (metadataFromTargetMap) {
        var metadataFromTarget = metadataFromTargetMap.get(propertyName);
        if (metadataFromTarget) {
          return metadataFromTarget;
        }
      }
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          var ancestorResult = ancestorMetadataMap.get(propertyName);
          if (ancestorResult) {
            return ancestorResult;
          }
        }
      }
      return void 0;
    };
    MetadataStorage3.prototype.findMetadatas = function(metadatas, target, propertyName) {
      var metadataFromTargetMap = metadatas.get(target);
      var metadataFromTarget;
      if (metadataFromTargetMap) {
        metadataFromTarget = metadataFromTargetMap.get(propertyName);
      }
      var metadataFromAncestorsTarget = [];
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          if (ancestorMetadataMap.has(propertyName)) {
            metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
          }
        }
      }
      return metadataFromAncestorsTarget.slice().reverse().concat((metadataFromTarget || []).slice().reverse());
    };
    MetadataStorage3.prototype.getAncestors = function(target) {
      if (!target) return [];
      if (!this._ancestorsMap.has(target)) {
        var ancestors = [];
        for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
          ancestors.push(baseClass);
        }
        this._ancestorsMap.set(target, ancestors);
      }
      return this._ancestorsMap.get(target);
    };
    return MetadataStorage3;
  })()
);

// ../../node_modules/class-transformer/esm5/storage.js
var defaultMetadataStorage = new MetadataStorage2();

// ../../node_modules/class-transformer/esm5/decorators/type.decorator.js
function Type(typeFunction, options) {
  if (options === void 0) {
    options = {};
  }
  return function(target, propertyName) {
    var reflectedType = Reflect.getMetadata("design:type", target, propertyName);
    defaultMetadataStorage.addTypeMetadata({
      target: target.constructor,
      propertyName,
      reflectedType,
      typeFunction,
      options
    });
  };
}
__name(Type, "Type");

// src/render-documento.dto.ts
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
var DataItem = class {
  static {
    __name(this, "DataItem");
  }
  text;
  break;
  style;
  img;
  transformation;
  imgSource;
};
_ts_decorate3([
  IsString(),
  IsNotEmpty(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "text", void 0);
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
  IsObject(),
  _ts_metadata3("design:type", Object)
], DataItem.prototype, "transformation", void 0);
_ts_decorate3([
  IsOptional(),
  IsString(),
  _ts_metadata3("design:type", String)
], DataItem.prototype, "imgSource", void 0);
var ParagraphConfig = class {
  static {
    __name(this, "ParagraphConfig");
  }
  heading;
  alignment;
  indent;
  spacing;
};
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
  IsObject(),
  _ts_metadata3("design:type", Object)
], ParagraphConfig.prototype, "indent", void 0);
_ts_decorate3([
  IsOptional(),
  IsObject(),
  _ts_metadata3("design:type", Object)
], ParagraphConfig.prototype, "spacing", void 0);
var BloqueContenido = class {
  static {
    __name(this, "BloqueContenido");
  }
  data;
  config;
};
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
var RenderDocumentoDto = class {
  static {
    __name(this, "RenderDocumentoDto");
  }
  carpetaId;
  nombreArchivo;
  bloques;
};
_ts_decorate3([
  IsString(),
  IsNotEmpty(),
  _ts_metadata3("design:type", String)
], RenderDocumentoDto.prototype, "carpetaId", void 0);
_ts_decorate3([
  IsString(),
  IsNotEmpty(),
  _ts_metadata3("design:type", String)
], RenderDocumentoDto.prototype, "nombreArchivo", void 0);
_ts_decorate3([
  IsArray(),
  ValidateNested({
    each: true
  }),
  Type(() => BloqueContenido),
  _ts_metadata3("design:type", Array)
], RenderDocumentoDto.prototype, "bloques", void 0);

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
      const estructuraDocx = this.compilerService.compilarJSON(dto.bloques);
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
  (0, import_common3.Post)("generar-pdf"),
  _ts_param(0, (0, import_common3.Body)()),
  _ts_param(1, (0, import_common3.Res)()),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof RenderDocumentoDto === "undefined" ? Object : RenderDocumentoDto,
    typeof Response === "undefined" ? Object : Response
  ]),
  _ts_metadata4("design:returntype", Promise)
], CompiladorController.prototype, "generarPdfDinamico", null);
CompiladorController = _ts_decorate4([
  (0, import_common3.Controller)("motor-documentos"),
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