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
  CONNECTION_STABILITY: () => CONNECTION_STABILITY,
  Column: () => Column,
  DataSourceManager: () => DataSourceManager,
  HookType: () => HookType,
  IBaseProvider: () => IBaseProvider,
  IGoogleSheetProvider: () => IGoogleSheetProvider,
  INTERNAL_NEW: () => INTERNAL_NEW,
  INTERNAL_REPO: () => INTERNAL_REPO,
  IPostgresProvider: () => IPostgresProvider,
  IProvider: () => IProvider,
  InjectModel: () => InjectModel,
  MetadataRegistry: () => MetadataRegistry,
  OutboxModule: () => OutboxModule,
  POSTGRES_TOKEN: () => POSTGRES_TOKEN,
  PostgresConfig: () => PostgresConfig,
  PrimaryKey: () => PrimaryKey,
  ROW_INDEX_SYMBOL: () => ROW_INDEX_SYMBOL,
  RepositoryCoreFacade: () => RepositoryCoreFacade,
  SHEETS_ALL_RELATIONS: () => SHEETS_ALL_RELATIONS,
  SHEETS_COLUMN_DETAILS: () => SHEETS_COLUMN_DETAILS,
  SHEETS_COLUMN_LIST: () => SHEETS_COLUMN_LIST,
  SHEETS_DELETE_CONTROL: () => SHEETS_DELETE_CONTROL,
  SHEETS_DTO: () => SHEETS_DTO,
  SHEETS_HOOKS: () => SHEETS_HOOKS,
  SHEETS_PRIMARY_KEY: () => SHEETS_PRIMARY_KEY,
  SHEETS_RELATIONS_LIST: () => SHEETS_RELATIONS_LIST,
  SHEETS_REPOSITORY_MARKER: () => SHEETS_REPOSITORY_MARKER,
  SHEETS_SPREADSHEET_ID: () => SHEETS_SPREADSHEET_ID,
  SHEETS_SUB_COLLECTIONS: () => SHEETS_SUB_COLLECTIONS,
  SHEETS_TABLE_NAME: () => SHEETS_TABLE_NAME,
  SHEETS_VERSION_FIELD: () => SHEETS_VERSION_FIELD,
  SHEETS_VIRTUALS: () => SHEETS_VIRTUALS,
  SHEETS_VIRTUAL_COLUMNS: () => SHEETS_VIRTUAL_COLUMNS,
  SHEET_ODM_MODULE_OPTIONS: () => SHEET_ODM_MODULE_OPTIONS,
  SheetOdmModule: () => SheetOdmModule,
  SheetOdmModuleOptions: () => SheetOdmModuleOptions,
  SheetsRepository: () => SheetsRepository,
  SubCollection: () => SubCollection,
  TABLE_COLUMN_KEY: () => TABLE_COLUMN_KEY,
  Table: () => Table
});
module.exports = __toCommonJS(index_exports);

// src/sheetOdm.module.ts
var import_common38 = require("@nestjs/common");
var import_axios2 = require("@nestjs/axios");
var import_core3 = require("@nestjs/core");
var import_auth8 = require("@spreadsheet/auth");

// src/shared/constants/constants.ts
var POSTGRES_TOKEN = "POSTGRES_PROVIDER";
var SHEETS_TABLE_NAME = /* @__PURE__ */ Symbol("sheets:table_name");
var SHEETS_COLUMN_LIST = /* @__PURE__ */ Symbol("sheets:column_list");
var TABLE_COLUMN_KEY = /* @__PURE__ */ Symbol("sheets:table_column");
var SHEETS_COLUMN_DETAILS = /* @__PURE__ */ Symbol("sheets:column_details");
var SHEETS_PRIMARY_KEY = /* @__PURE__ */ Symbol("sheets:primary_key");
var SHEETS_DELETE_CONTROL = /* @__PURE__ */ Symbol("sheets:delete_control");
var SHEETS_RELATIONS_LIST = /* @__PURE__ */ Symbol("sheets:relations_list");
var SHEETS_ALL_RELATIONS = /* @__PURE__ */ Symbol("sheets:all_relations");
var SHEETS_VIRTUALS = /* @__PURE__ */ Symbol("sheets:virtuals");
var SHEETS_SUB_COLLECTIONS = /* @__PURE__ */ Symbol("sheets:sub_collections");
var SHEETS_REPOSITORY_MARKER = /* @__PURE__ */ Symbol.for("__isSheetsRepository");
var SHEETS_DTO = /* @__PURE__ */ Symbol("sheets:dto");
var ROW_INDEX_SYMBOL = /* @__PURE__ */ Symbol("__row");
var SHEETS_VIRTUAL_COLUMNS = /* @__PURE__ */ Symbol("SHEETS_VIRTUAL_COLUMNS");
var SHEETS_VERSION_FIELD = /* @__PURE__ */ Symbol("sheets:version_field");
var SHEETS_HOOKS = /* @__PURE__ */ Symbol("sheets:hooks");
var HookType = /* @__PURE__ */ (function(HookType2) {
  HookType2["PRE_SAVE"] = "preSave";
  HookType2["POST_SAVE"] = "postSave";
  return HookType2;
})({});
var SHEET_ODM_MODULE_OPTIONS = "SHEET_ODM_MODULE_OPTIONS";
var SHEETS_SPREADSHEET_ID = "sheets:spreadsheet_id";
var INTERNAL_REPO = /* @__PURE__ */ Symbol("repository");
var INTERNAL_NEW = /* @__PURE__ */ Symbol("isNew");

// src/stages/pipeline.constants.ts
var PIPELINE_STAGE = /* @__PURE__ */ Symbol("PIPELINE_STAGE");
var DATA_TRANSFORM_OPERATOR = /* @__PURE__ */ Symbol("DATA_TRANSFORM_OPERATOR");
var FILTER_OPERATOR = /* @__PURE__ */ Symbol("FILTER_OPERATOR");

// src/core/data-source-manager.ts
var import_common5 = require("@nestjs/common");

// src/interfaces/provider.interface.ts
var IBaseProvider = class {
  static {
    __name(this, "IBaseProvider");
  }
};
var IGoogleSheetProvider = class extends IBaseProvider {
  static {
    __name(this, "IGoogleSheetProvider");
  }
};
var IProvider = class {
  static {
    __name(this, "IProvider");
  }
};
var IPostgresProvider = class extends IProvider {
  static {
    __name(this, "IPostgresProvider");
  }
};

// src/adapters/health/google-sheet-health.service.ts
var import_common = require("@nestjs/common");

// src/interfaces/sheet-odm-options.interface.ts
var CONNECTION_STABILITY = {
  STABLE: 1500,
  UNSTABLE: 3e3,
  CRITICAL: 5e3
  // Conexión muy lenta (Satélite/Radio)
};
var PostgresConfig = class {
  static {
    __name(this, "PostgresConfig");
  }
  host;
  port;
  username;
  password;
  database;
  ssl;
};
var SheetOdmModuleOptions = class {
  static {
    __name(this, "SheetOdmModuleOptions");
  }
  outboxRetentionInterval;
  googleDriveBaseFolderId;
  spreadsheetId;
  checkConnectionOnBoot;
  webAppUrl;
  apiKey;
  timeout;
  timezone;
  formatDates;
  outboxPollingInterval;
  postgres;
};

// src/adapters/health/google-sheet-health.service.ts
var import_auth = require("@spreadsheet/auth");
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
function _ts_param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param, "_ts_param");
var GoogleHealthService = class _GoogleHealthService {
  static {
    __name(this, "GoogleHealthService");
  }
  googleSheets;
  optionsDatabase;
  logger = new import_common.Logger(_GoogleHealthService.name);
  constructor(googleSheets, optionsDatabase) {
    this.googleSheets = googleSheets;
    this.optionsDatabase = optionsDatabase;
  }
  async onModuleInit() {
    this.logger.log("Iniciando validaciones de conectividad en segundo plano...");
    const health = await this.checkConnection();
    if (health.status === "down") {
      this.logger.error(`\u274C La base de datos de Google Sheets no est\xE1 disponible: ${health.details?.error}`);
    }
  }
  /**
   * Verifica la salud de la conexión con Google Sheets con reintentos lineales
   */
  async checkConnection(retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const startTime = Date.now();
        const response = await this.googleSheets.sheets.spreadsheets.get({
          spreadsheetId: this.optionsDatabase.spreadsheetId,
          includeGridData: false
        });
        const title = response.data.properties.title;
        const latency = Date.now() - startTime;
        this.logger.log(`\u2705 Conexi\xF3n exitosa con el documento: "${title}" (${latency}ms)`);
        return {
          status: "up",
          latency,
          details: {
            documentTitle: title,
            sheetsCount: response.data.sheets.length
          }
        };
      } catch (error) {
        const errorMessage = error.message || error;
        this.logger.warn(`\u26A0\uFE0F Intento ${i + 1}/${retries} fallido. Raz\xF3n: ${errorMessage}`);
        if (i === retries - 1) {
          return {
            status: "down",
            details: {
              error: `Fallaron los ${retries} intentos de conexi\xF3n. \xDAltimo error: ${errorMessage}`
            }
          };
        }
        await new Promise((res) => setTimeout(res, 1e3));
      }
    }
    return {
      status: "down",
      details: {
        error: "Bucle finalizado sin respuesta"
      }
    };
  }
};
GoogleHealthService = _ts_decorate([
  (0, import_common.Injectable)(),
  _ts_param(1, (0, import_common.Inject)(import_auth.SHEET_ODM_OPTIONS)),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof import_auth.GoogleClientProvider === "undefined" ? Object : import_auth.GoogleClientProvider,
    typeof SheetOdmModuleOptions === "undefined" ? Object : SheetOdmModuleOptions
  ])
], GoogleHealthService);

// src/infrastructure/gas-web-app/gas-query.gateway.ts
var import_common2 = require("@nestjs/common");
var import_auth2 = require("@spreadsheet/auth");
var import_axios = require("@nestjs/axios");
var import_rxjs = require("rxjs");
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
function _ts_param2(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param2, "_ts_param");
var GasQueryGateway = class _GasQueryGateway {
  static {
    __name(this, "GasQueryGateway");
  }
  httpService;
  pg;
  options;
  logger = new import_common2.Logger(_GasQueryGateway.name);
  apiKey;
  apiUrl;
  spreadsheetId;
  constructor(httpService, pg, options) {
    this.httpService = httpService;
    this.pg = pg;
    this.options = options;
    if (!this.options.webAppUrl || !this.options.apiKey || !this.options.spreadsheetId) {
      throw new Error("Configuraci\xF3n SheetODM inv\xE1lida. Faltan webAppUrl, apiKey o spreadsheetId en la configuraci\xF3n del m\xF3dulo.");
    }
    this.apiUrl = this.options.webAppUrl;
    this.apiKey = this.options.apiKey;
    this.spreadsheetId = this.options.spreadsheetId;
  }
  /**
   * Centraliza las consultas indexadas y mutaciones a través de HTTP POST (doPost en GAS)
   */
  async executeGasQuery(action, sheet, data, retries = 2, delay = 1e3) {
    const startTime = Date.now();
    let success = true;
    let errorMessage;
    const payload = {
      apiKey: this.apiKey,
      action,
      sheet,
      spreadsheetId: this.spreadsheetId,
      data
    };
    try {
      const response = await (0, import_rxjs.firstValueFrom)(this.httpService.post("", payload, {
        baseURL: this.apiUrl,
        timeout: 15e3,
        headers: {
          "Content-Type": "application/json"
        }
      }));
      if (response.data?.success === false || response.data?.error) {
        success = false;
        errorMessage = response.data?.error || "Error interno desconocido en el motor GAS";
        throw new Error(errorMessage);
      }
      return response.data?.data;
    } catch (error) {
      const isNetworkOrTimeout = error.code === "ECONNABORTED" || !error.response || error.response?.status >= 500;
      if (retries > 0 && isNetworkOrTimeout) {
        this.logger.warn(`Fallo temporal en carril HTTP GAS (${action}). Reintentando en ${delay}ms... (${retries} intentos restantes)`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.executeGasQuery(action, sheet, data, retries - 1, delay * 2);
      }
      success = false;
      errorMessage = errorMessage || error.message || "Error de conexi\xF3n";
      throw new import_common2.HttpException(`Carril GAS Interrumpido (${action}): ${errorMessage}`, import_common2.HttpStatus.BAD_GATEWAY);
    } finally {
      const latency = Date.now() - startTime;
      try {
        await this.pg.query(`INSERT INTO read_logs (sheet_name, operation, latency_ms, success, error) VALUES ($1, $2, $3, $4, $5)`, [
          sheet,
          action,
          latency,
          success,
          errorMessage || null
        ]);
      } catch (logError) {
        const message = logError instanceof Error ? logError.message : String(logError);
        this.logger.error(`No se pudo guardar la m\xE9trica en Postgres: ${message}`);
      }
    }
  }
  // =========================================================================
  // IMPLEMENTACIÓN DE LA INTERFAZ DE LECTURA (CLEAN CQRS)
  // =========================================================================
  async findOne(sheetName, column, value) {
    return this.executeGasQuery("findOne", sheetName, {
      column,
      value
    });
  }
  async findMany(sheetName, column, value) {
    const results = await this.executeGasQuery("findMany", sheetName, {
      column,
      value
    });
    return results || [];
  }
  async find(sheetName) {
    const results = await this.executeGasQuery("find", sheetName);
    return results || [];
  }
  // =========================================================================
  // IMPLEMENTACIÓN DE MUTACIONES (ESCRITURA / OUTBOX)
  // =========================================================================
  async batchCommit(sheetName, batchData) {
    this.logger.debug(`\u{1F4E4} [GAS-GATEWAY] Despachando batchCommit hacia hoja [${sheetName}]`);
    return this.executeGasQuery("batchCommit", sheetName, batchData);
  }
  async execute(action, sheetName, data) {
    return this.executeGasQuery(action, sheetName, data);
  }
};
GasQueryGateway = _ts_decorate2([
  (0, import_common2.Injectable)(),
  _ts_param2(1, (0, import_common2.Inject)(POSTGRES_TOKEN)),
  _ts_param2(2, (0, import_common2.Inject)(import_auth2.SHEET_ODM_OPTIONS)),
  _ts_metadata2("design:type", Function),
  _ts_metadata2("design:paramtypes", [
    typeof import_axios.HttpService === "undefined" ? Object : import_axios.HttpService,
    typeof IPostgresProvider === "undefined" ? Object : IPostgresProvider,
    typeof SheetOdmModuleOptions === "undefined" ? Object : SheetOdmModuleOptions
  ])
], GasQueryGateway);

// src/infrastructure/sheet-api/sheet-data.gateway.ts
var import_common4 = require("@nestjs/common");

// src/JoinSheetTabs/metadata.registry.ts
var import_common3 = require("@nestjs/common");

// src/core/store/entity-store.ts
var globalEntityDataStore = /* @__PURE__ */ new WeakMap();
var EntityStore = {
  set(instance, data) {
    globalEntityDataStore.set(instance, data);
  },
  get(instance) {
    return globalEntityDataStore.get(instance);
  },
  has(instance) {
    return globalEntityDataStore.has(instance);
  }
};

// src/JoinSheetTabs/metadata.registry.ts
function _ts_decorate3(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate3, "_ts_decorate");
var ODM_GLOBAL_REGISTRY_KEY = /* @__PURE__ */ Symbol.for("sheetOdm.global_metadata_store");
if (!globalThis[ODM_GLOBAL_REGISTRY_KEY]) {
  globalThis[ODM_GLOBAL_REGISTRY_KEY] = /* @__PURE__ */ new Set();
}
var MetadataRegistry = class _MetadataRegistry {
  static {
    __name(this, "MetadataRegistry");
  }
  static entities = /* @__PURE__ */ new Set();
  relations = /* @__PURE__ */ new Map();
  logger = new import_common3.Logger(_MetadataRegistry.name);
  // Cachés a nivel de instancia
  schemaCache = /* @__PURE__ */ new Map();
  // 🔥 OPTIMIZACIÓN: Índices O(1) para búsquedas ultrarrápidas
  nameIndex = /* @__PURE__ */ new Map();
  sheetIndex = /* @__PURE__ */ new Map();
  static register(target) {
    const store = globalThis[ODM_GLOBAL_REGISTRY_KEY];
    store.add(target);
    console.log(`\u{1F50D} [MetadataRegistry] Entidad registrada: ${target.name}. Total: ${this.entities.size}`);
  }
  static getAllRegisteredEntities() {
    const store = globalThis[ODM_GLOBAL_REGISTRY_KEY];
    return Array.from(store);
  }
  getJoinConfig(entityClass, propertyName) {
    const schema = this.getSchema(entityClass);
    const rel = schema.relations[propertyName];
    if (!rel) return void 0;
    const targetEntity = rel.targetEntity();
    const localField = rel.localField || schema.primaryKey;
    let foreignKey = rel.joinColumn;
    if (!foreignKey) {
      if (rel.type === "reference") {
        const capitalizedProp = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
        foreignKey = `id${capitalizedProp}`;
      } else {
        const baseName = entityClass.name.replace("Entity", "").replace("Model", "");
        foreignKey = `id${baseName}`;
      }
    }
    return {
      targetEntity,
      foreignKey,
      localField,
      isMany: rel.isMany
    };
  }
  getSchema(entityClass) {
    let schema = this.schemaCache.get(entityClass);
    if (!schema) {
      schema = this.compileSchema(entityClass);
      this.schemaCache.set(entityClass, schema);
      this.nameIndex.set(entityClass.name, entityClass);
      this.sheetIndex.set(schema.sheetName, entityClass);
    }
    return schema;
  }
  getPrimaryKeyField(entityClass) {
    return this.getSchema(entityClass).primaryKey;
  }
  getPrimaryKeyColumnName(entityClass) {
    return this.getSchema(entityClass).primaryKeyColumnName;
  }
  getColumnDetails(entityClass) {
    return this.getSchema(entityClass).columns;
  }
  getColumnMap(entityClass) {
    const schema = this.getSchema(entityClass);
    const map2 = {};
    schema.columnList.forEach((colName, index) => {
      map2[colName] = index;
    });
    return map2;
  }
  getDeleteControlProperty(entityClass) {
    return this.getSchema(entityClass).deleteControl;
  }
  getRelationsList(entityClass) {
    return Object.keys(this.getSchema(entityClass).relations);
  }
  getCompiledRelations(entityClass) {
    return Object.values(this.getSchema(entityClass).relations);
  }
  getColumnList(entityClass) {
    return this.getSchema(entityClass).columnList;
  }
  getVersionField(entityClass) {
    return this.getSchema(entityClass).versionField;
  }
  getColumnOptions(entityClass, path) {
    const details = this.getColumnDetails(entityClass);
    if (!path.includes(".")) return details[path];
    return this.resolveDeepMetadata(entityClass, path.split("."));
  }
  resolveDeepMetadata(targetClass, parts) {
    let currentTarget = targetClass;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const details = this.getColumnDetails(currentTarget);
      if (i === parts.length - 1) return details[part];
      const schema = this.getSchema(currentTarget);
      const relation = schema.relations[part];
      if (relation?.targetEntity) {
        currentTarget = relation.targetEntity();
      } else {
        return void 0;
      }
    }
    return void 0;
  }
  getRelationOptions(entityClass, relationName) {
    return this.getSchema(entityClass).relations[relationName];
  }
  // 🔥 OPTIMIZACIÓN: Búsqueda O(1) usando el índice precompilado
  getEntityBySheetName(sheetName) {
    const targetSheetName = sheetName.toUpperCase();
    if (!this.sheetIndex.has(targetSheetName)) {
      _MetadataRegistry.getAllRegisteredEntities().forEach((e) => this.getSchema(e));
    }
    return this.sheetIndex.get(targetSheetName);
  }
  // 🔥 OPTIMIZACIÓN: Búsqueda O(1)
  getEntityByName(className) {
    if (!this.nameIndex.has(className)) {
      _MetadataRegistry.getAllRegisteredEntities().forEach((e) => this.getSchema(e));
    }
    return this.nameIndex.get(className);
  }
  getColumnNamesForGas(entityClass) {
    const schema = this.getSchema(entityClass);
    return schema.columnList.map((prop) => schema.columns[prop]?.name || prop);
  }
  compileSchema(entityClass) {
    const proto = entityClass.prototype;
    const primaryKeyProperty = Reflect.getMetadata(SHEETS_PRIMARY_KEY, entityClass) || "id";
    const details = Reflect.getMetadata(SHEETS_COLUMN_DETAILS, entityClass) || {};
    const pkConfig = details[primaryKeyProperty];
    const relationProperties = Reflect.getMetadata(SHEETS_RELATIONS_LIST, proto) || [];
    const compiledRelations = {};
    for (const prop of relationProperties) {
      const rawRel = Reflect.getMetadata(SHEETS_ALL_RELATIONS, proto, prop) || Reflect.getMetadata(SHEETS_ALL_RELATIONS, entityClass, prop);
      if (!rawRel) continue;
      if (rawRel.isMany) {
        compiledRelations[prop] = {
          propertyName: prop,
          isMany: true,
          type: "subcollection",
          targetEntity: rawRel.targetEntity,
          joinColumn: rawRel.joinColumn,
          // localField es opcional, si no existe no pasa nada
          localField: rawRel.localField || void 0,
          onDelete: rawRel.onDelete || "CASCADE",
          rawOptions: rawRel
          // Mantenemos el original por si acaso
        };
      } else {
        compiledRelations[prop] = {
          propertyName: prop,
          isMany: false,
          type: "reference",
          targetEntity: rawRel.targetEntity,
          joinColumn: rawRel.joinColumn,
          required: rawRel.required ?? false,
          onDelete: rawRel.onDelete || "RESTRICT",
          rawOptions: rawRel
        };
      }
    }
    const sheetNameAttr = Reflect.getMetadata(SHEETS_TABLE_NAME, entityClass);
    const sheetName = (sheetNameAttr || entityClass.name).toUpperCase();
    return {
      sheetName,
      primaryKey: primaryKeyProperty,
      primaryKeyColumnName: (pkConfig?.name || primaryKeyProperty).toUpperCase(),
      columns: details,
      columnList: Reflect.getMetadata(SHEETS_COLUMN_LIST, entityClass) || [],
      deleteControl: Reflect.getMetadata(SHEETS_DELETE_CONTROL, entityClass) || null,
      versionField: Reflect.getMetadata(SHEETS_VERSION_FIELD, entityClass) || null,
      relations: compiledRelations,
      virtuals: Reflect.getMetadata(SHEETS_VIRTUALS, entityClass) || []
    };
  }
  // ------------------ MÉTODOS DE REGISTRO ESTÁTICO ------------------
  static registerEntity(entity) {
    this.entities.add(entity);
  }
  serialize(entity, entityClass) {
    const schema = this.getSchema(entityClass);
    const rawData = EntityStore.get(entity) || entity;
    return schema.columnList.map((propertyName) => {
      const valor = rawData[propertyName];
      return valor === void 0 || valor === null ? "" : valor;
    });
  }
  mapRawToEntity(rawData, entityClass) {
    const schema = this.getSchema(entityClass);
    const mappedObject = {};
    for (const [propertyName, options] of Object.entries(schema.columns)) {
      const dbKey = this.getDatabaseColumnName(entityClass, propertyName);
      let rawValue;
      if (rawData && Object.prototype.hasOwnProperty.call(rawData, dbKey)) {
        rawValue = rawData[dbKey];
      } else if (rawData && Object.prototype.hasOwnProperty.call(rawData, propertyName)) {
        rawValue = rawData[propertyName];
      }
      if (rawValue !== void 0) {
        mappedObject[propertyName] = this.normalizeValue(rawValue);
      }
    }
    if (rawData && rawData[ROW_INDEX_SYMBOL]) {
      mappedObject[ROW_INDEX_SYMBOL] = rawData[ROW_INDEX_SYMBOL];
    }
    return mappedObject;
  }
  normalizeValue(val) {
    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) {
      return val.split("T")[0];
    }
    return val;
  }
  getExpectedHeadersForGas(entityClass) {
    const schema = this.getSchema(entityClass);
    return schema.columnList.map((prop) => {
      const colConfig = schema.columns[prop];
      const baseName = colConfig?.name || prop;
      return colConfig?.index ? `${baseName}*` : baseName;
    });
  }
  getDatabaseColumnName(entityClass, propertyName) {
    const schema = this.getSchema(entityClass);
    const colConfig = schema.columns[propertyName];
    if (!colConfig) return propertyName;
    const baseName = (colConfig.name || propertyName).toUpperCase();
    return colConfig.index ? `${baseName}*` : baseName;
  }
};
MetadataRegistry = _ts_decorate3([
  (0, import_common3.Injectable)()
], MetadataRegistry);

// src/infrastructure/sheet-api/sheet-data.gateway.ts
var import_auth3 = require("@spreadsheet/auth");
var import_auth4 = require("@spreadsheet/auth");
function _ts_decorate4(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate4, "_ts_decorate");
function _ts_metadata3(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata3, "_ts_metadata");
function _ts_param3(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param3, "_ts_param");
var SheetDataGateway = class _SheetDataGateway {
  static {
    __name(this, "SheetDataGateway");
  }
  auth;
  options;
  metadataRegistry;
  logger = new import_common4.Logger(_SheetDataGateway.name);
  spreadsheetId;
  constructor(auth, options, metadataRegistry) {
    this.auth = auth;
    this.options = options;
    this.metadataRegistry = metadataRegistry;
    if (!this.options.spreadsheetId) {
      throw new Error("SheetOdmModule requiere un [spreadsheetId] v\xE1lido en sus opciones.");
    }
    this.spreadsheetId = this.options.spreadsheetId;
  }
  async createSheet(title) {
    return await this.auth.sheets.spreadsheets.batchUpdate({
      spreadsheetId: this.spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title
              }
            }
          }
        ]
      }
    });
  }
  async writeHeaders(sheetName, headers) {
    await this.auth.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          headers
        ]
      }
    });
  }
  async appendRow(sheetName, row) {
    try {
      const response = await this.auth.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:A`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            row
          ]
        }
      });
      const updatedRange = response.data?.updates?.updatedRange;
      if (updatedRange) {
        const match = updatedRange.match(/\d+$/);
        if (match) {
          return parseInt(match[0], 10);
        }
      }
      throw new Error(`No se pudo determinar la fila f\xEDsica insertada en ${sheetName}`);
    } catch (error) {
      this.logger.error(`Error en appendRow para ${sheetName}: ${error.message}`);
      throw error;
    }
  }
  async appendRows(sheetName, rows) {
    if (!rows || rows.length === 0) return [];
    try {
      const response = await this.auth.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:A`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: rows
        }
      });
      const updatedRange = response.data?.updates?.updatedRange;
      if (updatedRange) {
        const parts = updatedRange.split("!");
        const rangePart = parts[1] || parts[0];
        const matches = rangePart.match(/\d+/g);
        if (matches) {
          const startRow = parseInt(matches[0], 10);
          const endRow = matches[1] ? parseInt(matches[1], 10) : startRow;
          const indices = [];
          for (let i = startRow; i <= endRow; i++) {
            indices.push(i);
          }
          return indices;
        }
      }
      throw new Error(`No se pudo determinar el rango f\xEDsico insertado en ${sheetName}`);
    } catch (error) {
      this.logger.error(`\u274C Error en appendRows para ${sheetName}: ${error.message}`);
      throw error;
    }
  }
  async getExistingSheetTitles() {
    const res = await this.auth.sheets.spreadsheets.get({
      spreadsheetId: this.spreadsheetId
    });
    return res.data.sheets?.map((s) => s.properties?.title || "") || [];
  }
  async getRange(range) {
    const res = await this.auth.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range,
      //valueInputOption: 'RAW',
      valueRenderOption: "UNFORMATTED_VALUE"
    });
    return res.data.values || [];
  }
  async updateRow(sheetName, rowNumber, values) {
    try {
      await this.auth.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A${rowNumber}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            values
          ]
        }
      });
      return rowNumber;
    } catch (error) {
      this.logger.error(`Error en updateRow en ${sheetName} (Fila ${rowNumber}): ${error.message}`);
      throw error;
    }
  }
  async clearRow(sheetName, rowNumber) {
    try {
      await this.auth.sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!${rowNumber}:${rowNumber}`
      });
    } catch (error) {
      this.logger.error(`Error en clearRow para ${sheetName} en fila ${rowNumber}: ${error.message}`);
      throw error;
    }
  }
  async getRowData(sheetName, rowNumber) {
    const range = `${sheetName}!${rowNumber}:${rowNumber}`;
    const values = await this.getRange(range);
    return values[0] || [];
  }
  getDocId(entityClass, rowData) {
    const pkField = this.metadataRegistry.getPrimaryKeyField(entityClass);
    const columnMap = this.metadataRegistry.getColumnMap(entityClass);
    const index = columnMap[pkField];
    return rowData[index];
  }
  async batchUpdateValues(data) {
    try {
      if (data.length === 0) return;
      await this.auth.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requestBody: {
          valueInputOption: "USER_ENTERED",
          data: data.map((item) => ({
            range: item.range,
            values: item.values
          }))
        }
      });
      this.logger.log(`[Gateway] \u26A1 Batch Update completado con \xE9xito. Rupturas de cuota evitadas.`);
    } catch (error) {
      this.logger.error(`Error en batchUpdateValues: ${error.message}`);
      throw error;
    }
  }
  async batchClearValues(ranges) {
    try {
      if (ranges.length === 0) return;
      await this.auth.sheets.spreadsheets.values.batchClear({
        spreadsheetId: this.spreadsheetId,
        requestBody: {
          ranges
        }
      });
      this.logger.log(`[Gateway] \u{1F9FC} Batch Clear ejecutado para ${ranges.length} rangos.`);
    } catch (error) {
      this.logger.error(`Error en batchClearValues: ${error.message}`);
      throw error;
    }
  }
  async getBoundaries(sheetName) {
    try {
      const res = await this.auth.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: sheetName,
        //valueInputOption: 'RAW',
        valueRenderOption: "UNFORMATTED_VALUE"
      });
      const values = res.data.values;
      if (!values || values.length === 0) {
        return {
          lastRow: 0,
          lastColumn: 0
        };
      }
      const lastRow = values.length;
      const lastColumn = Math.max(...values.map((row) => row.length));
      this.logger.debug(`[Boundaries] ${sheetName} -> Fila: ${lastRow}, Columna: ${lastColumn}`);
      return {
        lastRow,
        lastColumn
      };
    } catch (error) {
      this.logger.error(`Error obteniendo l\xEDmites de ${sheetName}: ${error.message}`);
      throw error;
    }
  }
};
SheetDataGateway = _ts_decorate4([
  (0, import_common4.Injectable)(),
  _ts_param3(1, (0, import_common4.Inject)(import_auth3.SHEET_ODM_OPTIONS)),
  _ts_metadata3("design:type", Function),
  _ts_metadata3("design:paramtypes", [
    typeof import_auth4.GoogleClientProvider === "undefined" ? Object : import_auth4.GoogleClientProvider,
    typeof SheetOdmModuleOptions === "undefined" ? Object : SheetOdmModuleOptions,
    typeof MetadataRegistry === "undefined" ? Object : MetadataRegistry
  ])
], SheetDataGateway);

// src/core/outbox/interfaces/outbox-entry.interface.ts
var OutboxStatus = /* @__PURE__ */ (function(OutboxStatus2) {
  OutboxStatus2["PENDING"] = "PENDING";
  OutboxStatus2["PROCESSING"] = "PROCESSING";
  OutboxStatus2["COMPLETED"] = "COMPLETED";
  OutboxStatus2["FAILED"] = "FAILED";
  return OutboxStatus2;
})({});
var TypeOp = /* @__PURE__ */ (function(TypeOp2) {
  TypeOp2["INSERT"] = "INSERT";
  TypeOp2["UPDATE"] = "UPDATE";
  TypeOp2["DELETE"] = "DELETE";
  return TypeOp2;
})({});
var OutboxService = class {
  static {
    __name(this, "OutboxService");
  }
};

// src/shared/id.generator.ts
var import_uuid = require("uuid");
var import_nanoid = require("nanoid");
var IdFactory = class {
  static {
    __name(this, "IdFactory");
  }
  /**
   * Recomendado para PKs de BD. 
   * El estándar de la industria para evitar colisiones.
   */
  static createUUID() {
    return (0, import_uuid.v4)();
  }
  /**
   * Recomendado para IDs de referencia externa o URLs legibles.
   * nanoid es 2x más rápido que uuid y más seguro que cortar un string.
   */
  static createShort() {
    return (0, import_nanoid.nanoid)(10);
  }
};

// src/core/data-source-manager.ts
function _ts_decorate5(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate5, "_ts_decorate");
function _ts_metadata4(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata4, "_ts_metadata");
function _ts_param4(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param4, "_ts_param");
var DataSourceManager = class _DataSourceManager {
  static {
    __name(this, "DataSourceManager");
  }
  googleHealth;
  postgresProvider;
  gasQueryGateway;
  sheetDataGateway;
  outboxService;
  metadataRegistry;
  logger = new import_common5.Logger(_DataSourceManager.name);
  constructor(googleHealth, postgresProvider, gasQueryGateway, sheetDataGateway, outboxService, metadataRegistry) {
    this.googleHealth = googleHealth;
    this.postgresProvider = postgresProvider;
    this.gasQueryGateway = gasQueryGateway;
    this.sheetDataGateway = sheetDataGateway;
    this.outboxService = outboxService;
    this.metadataRegistry = metadataRegistry;
  }
  // ========================================================================
  // 🚦 GESTIÓN DEL CICLO DE VIDA Y SALUD (Mantenido y optimizado)
  // ========================================================================
  async onApplicationShutdown(signal) {
    this.logger.log(`Recibida se\xF1al de apagado (${signal}). Cerrando conexiones limpiamente...`);
    try {
      await this.postgresProvider.disconnect();
      this.logger.log("\u2705 Conexiones de infraestructura cerradas correctamente.");
    } catch (error) {
      this.logger.error(`\u274C Error cerrando conexiones: ${error.message}`);
    }
  }
  async checkAllHealth() {
    this.logger.debug("Ejecutando diagn\xF3stico integral de infraestructura...");
    const [google, postgres] = await Promise.all([
      this.googleHealth.checkConnection(),
      this.postgresProvider.checkHealth()
    ]);
    let globalStatus = "healthy";
    if (google.status === "down" && postgres.status === "down") {
      globalStatus = "down";
    } else if (google.status === "down" || postgres.status === "down") {
      globalStatus = "degraded";
    }
    return {
      status: globalStatus,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      services: {
        google,
        postgres
      }
    };
  }
  // ========================================================================
  // 📖 RUTAS DE LECTURA (Delegadas al GAS Query Gateway)
  // ========================================================================
  async readFindAll(sheetName) {
    return this.executeWithRetry(async () => {
      console.log(`gas query gateway ${JSON.stringify(await this.gasQueryGateway.find(sheetName))}`);
      return await this.gasQueryGateway.find(sheetName);
    }, `Lectura Global - ${sheetName}`);
  }
  async readFindOne(sheetName, column, value) {
    return this.executeWithRetry(() => this.gasQueryGateway.findOne(sheetName, column, value), `B\xFAsqueda \xDAnica - ${sheetName}`);
  }
  async readFindMany(sheetName, column, value) {
    return this.executeWithRetry(() => this.gasQueryGateway.findMany(sheetName, column, value), `B\xFAsqueda M\xFAltiple - ${sheetName}`);
  }
  // ========================================================================
  // ✍️ RUTAS DE ESCRITURA (Delegadas a Postgres Outbox)
  // ========================================================================
  /**
   * Registra la intención de mutación en Postgres.
   * Google Sheets (Trigger) se encargará de leer esto e impactar la hoja física.
   */
  /**
  * Registra la intención de mutación usando el OutboxService abstracto.
  */
  async dispatchMutation(entityClass, operation, payload, rawDoc) {
    const sheetName = this.metadataRegistry.getSchema(entityClass).sheetName;
    const entityName = entityClass.name;
    const entry = {
      id: IdFactory.createUUID(),
      entityName,
      doc: rawDoc || payload,
      operation,
      status: OutboxStatus.PENDING,
      attempts: 0,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      sheetName,
      payload
    };
    await this.executeWithRetry(async () => {
      await this.outboxService.saveTransaction([
        entry
      ]);
    }, `Despacho a Outbox [${operation}] - ${entityName}`, 3, 500);
  }
  // ========================================================================
  // 🏗️ RUTAS ESTRUCTURALES DIRECTAS (Delegadas a Sheet Data Gateway)
  // ========================================================================
  /**
   * Opcional: Permite realizar operaciones inmediatas (DDL) como crear hojas
   * o escribir cabeceras directamente desde Node.js sin pasar por la Outbox.
   */
  get directAdminAccess() {
    return this.sheetDataGateway;
  }
  // ========================================================================
  // 🛡️ MOTOR DE RESILIENCIA CENTRALIZADO
  // ========================================================================
  async executeWithRetry(operation, context = "Operation", maxRetries = 3, baseDelayMs = 1e3) {
    let attempt = 1;
    while (attempt <= maxRetries) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) {
          this.logger.error(`\u274C [${context}] Fall\xF3 tras ${maxRetries} intentos. Abortando.`, error.stack);
          throw error;
        }
        const delay = baseDelayMs * Math.pow(2, attempt - 1);
        this.logger.warn(`\u26A0\uFE0F [${context}] Error: ${error.message}. Reintentando ${attempt}/${maxRetries} en ${delay}ms...`);
        await this.sleep(delay);
        attempt++;
      }
    }
    throw new Error("Unreachable retry block");
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
};
DataSourceManager = _ts_decorate5([
  (0, import_common5.Injectable)(),
  _ts_param4(1, (0, import_common5.Inject)(POSTGRES_TOKEN)),
  _ts_metadata4("design:type", Function),
  _ts_metadata4("design:paramtypes", [
    typeof GoogleHealthService === "undefined" ? Object : GoogleHealthService,
    typeof IPostgresProvider === "undefined" ? Object : IPostgresProvider,
    typeof GasQueryGateway === "undefined" ? Object : GasQueryGateway,
    typeof SheetDataGateway === "undefined" ? Object : SheetDataGateway,
    typeof OutboxService === "undefined" ? Object : OutboxService,
    typeof MetadataRegistry === "undefined" ? Object : MetadataRegistry
  ])
], DataSourceManager);

// src/core/interceptors/gas-telemetry.interceptor.ts
var import_common6 = require("@nestjs/common");
var import_operators = require("rxjs/operators");
function _ts_decorate6(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate6, "_ts_decorate");
var GasTelemetryInterceptor = class {
  static {
    __name(this, "GasTelemetryInterceptor");
  }
  logger = new import_common6.Logger("GAS_Telemetry");
  intercept(context, next) {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, url, query, params } = request;
    return next.handle().pipe((0, import_operators.tap)({
      next: /* @__PURE__ */ __name(() => {
        const duration = Date.now() - startTime;
        this.logger.log(`[SUCCESS] ${method} ${url} | Duraci\xF3n: ${duration}ms | Params: ${JSON.stringify(params)} | Query: ${JSON.stringify(query)}`);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        const duration = Date.now() - startTime;
        this.logger.error(`[FAILED] ${method} ${url} | Duraci\xF3n: ${duration}ms | Error: ${error.message}`);
      }, "error")
    }));
  }
};
GasTelemetryInterceptor = _ts_decorate6([
  (0, import_common6.Injectable)()
], GasTelemetryInterceptor);

// src/core/base/sheet-document-hydrator.ts
var import_common8 = require("@nestjs/common");
var import_crypto = require("crypto");

// src/core/wrapper/sheet-document.ts
var SheetDocument = class {
  static {
    __name(this, "SheetDocument");
  }
  [INTERNAL_REPO];
  [INTERNAL_NEW];
  constructor(data, repository, isNew) {
    Object.defineProperty(this, INTERNAL_REPO, {
      value: repository,
      enumerable: false
    });
    Object.defineProperty(this, INTERNAL_NEW, {
      value: isNew,
      enumerable: false,
      writable: true
    });
  }
  /**
   * Guarda el documento actual usando el repositorio.
   */
  async save() {
    if (!this[INTERNAL_REPO]) {
      throw new Error(`[OdmError] Documento hu\xE9rfano: No se encontr\xF3 un repositorio asociado.`);
    }
    return await this[INTERNAL_REPO].save(this);
  }
  /**
   * Elimina el documento actual.
   */
  async remove() {
    if (!this[INTERNAL_REPO]) {
      throw new Error(`[OdmError] Documento hu\xE9rfano: No se encontr\xF3 un repositorio asociado.`);
    }
    return await this[INTERNAL_REPO].delete(this);
  }
  /**
   * Marca el documento como guardado, útil tras una operación exitosa.
   */
  markAsSaved(rowNumber) {
    this[INTERNAL_NEW] = false;
    this[ROW_INDEX_SYMBOL] = rowNumber;
  }
  /**
   * Obtiene el índice físico de la fila en Google Sheets
   */
  get rowNumber() {
    return this[ROW_INDEX_SYMBOL];
  }
  getPrimaryKeyValue(key) {
    return this[key];
  }
};

// src/core/base/sheetDataTransformer.ts
var import_common7 = require("@nestjs/common");
var import_dayjs = __toESM(require("dayjs"));
var import_timezone = __toESM(require("dayjs/plugin/timezone"));
function _ts_decorate7(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate7, "_ts_decorate");
import_dayjs.default.extend(import_timezone.default);
var SheetDataTransformer = class {
  static {
    __name(this, "SheetDataTransformer");
  }
  /*
  *Descripcion: Convierte un valor crudo de la hoja de cálculo al tipo de dato
  *             correcto de TypeScript.
  */
  castValue(value, type = "string", defaultValue = null, appTimezone = "UTC") {
    if (value === void 0 || value === null || String(value).trim() === "") {
      return defaultValue;
    }
    switch (type) {
      case "json":
        try {
          return typeof value === "string" ? JSON.parse(value) : value;
        } catch (e) {
          return defaultValue || {};
        }
      case "number":
        const cleanNum = String(value).replace(/\s/g, "").replace(",", ".");
        const num = Number(cleanNum);
        return isNaN(num) ? defaultValue : num;
      case "currency":
        let clean = String(value).replace(/[S/$.\s,]/g, (match) => {
          return match === "," ? "" : "";
        });
        const numericString = String(value).replace(/[^0-9.,-]/g, "");
        const normalized = numericString.includes(",") && numericString.includes(".") ? numericString.replace(/\./g, "").replace(",", ".") : numericString.replace(",", ".");
        const currencyNum = parseFloat(normalized);
        return isNaN(currencyNum) ? defaultValue : currencyNum;
      case "boolean":
        const strBool = String(value).toLowerCase().trim();
        return [
          "true",
          "1",
          "si",
          "yes",
          "x",
          "checked"
        ].includes(strBool);
      case "date":
        if (value instanceof Date) return (0, import_dayjs.default)(value).tz(appTimezone).toDate();
        const formats = "DD/MM/YYYY";
        const djsDate = import_dayjs.default.tz(String(value), formats, appTimezone);
        return djsDate.isValid() ? djsDate.hour(12).minute(0).second(0).toDate() : defaultValue;
      default:
        return typeof value === "string" ? value.trim() : String(value);
    }
  }
  /**
   * Prepara el valor para ser insertado en la celda de Google Sheets.
   */
  prepareValueForSheet(value, type = "string") {
    if (value === void 0 || value === null) return "";
    switch (type) {
      case "date":
        if (value instanceof Date) return value;
        return value;
      case "number":
      case "currency":
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
      case "boolean":
        return !!value;
      default:
        return String(value).trim();
    }
  }
  /**
       * Formatea valores de TypeScript a formatos amigables para Google Sheets (Perú)
       */
  formatValueForSheet(value, type = "string") {
    if (value === void 0 || value === null) return "";
    switch (type) {
      case "currency":
        if (typeof value !== "number") return value;
        return new Intl.NumberFormat("es-PE", {
          style: "currency",
          currency: "PEN",
          minimumFractionDigits: 2
        }).format(value);
      case "date":
        if (!(value instanceof Date)) {
          const d = new Date(value);
          if (isNaN(d.getTime())) return value;
          value = d;
        }
        return value.toLocaleDateString("es-PE");
      case "boolean":
        return value === true ? "SI" : "NO";
      case "number":
        return typeof value === "number" ? value : parseFloat(value);
      default:
        return String(value).trim();
    }
  }
  areEqual(val1, val2) {
    if (val1 instanceof Date && val2 instanceof Date) {
      return val1.getTime() === val2.getTime();
    }
    return val1 === val2;
  }
  formatForSheet(value, type) {
    if (value === null || value === void 0) return "";
    if (value instanceof Date) {
      return value.toLocaleDateString("es-PE");
    }
    if (type === "currency" && typeof value === "number") {
      return value;
    }
    return value;
  }
};
SheetDataTransformer = _ts_decorate7([
  (0, import_common7.Injectable)()
], SheetDataTransformer);

// src/core/base/sheet-document-hydrator.ts
function _ts_decorate8(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate8, "_ts_decorate");
function _ts_metadata5(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata5, "_ts_metadata");
var SheetDocumentHydrator = class _SheetDocumentHydrator {
  static {
    __name(this, "SheetDocumentHydrator");
  }
  transformer;
  logger = new import_common8.Logger(_SheetDocumentHydrator.name);
  constructor(transformer) {
    this.transformer = transformer;
  }
  hydrateAndShield(entityClass, repository, rawData, options = {}) {
    if (!rawData) {
      throw new Error(`[Hydrator] No se pueden hidratar datos nulos para ${entityClass.name}`);
    }
    try {
      const dataToProcess = options.new === false && options.oldDataFlat ? options.oldDataFlat : rawData;
      const isNewDoc = options.new !== void 0 ? options.new : dataToProcess[ROW_INDEX_SYMBOL] === void 0;
      const targetPrototype = entityClass.prototype;
      const details = Reflect.getMetadata(SHEETS_COLUMN_DETAILS, targetPrototype) || {};
      const processedData = {};
      for (const key in details) {
        const config = details[key];
        const dbColumnName = config.name || key;
        let value = dataToProcess[dbColumnName];
        if (config && config.type) {
          value = this.transformer.castValue(value, config.type);
        }
        if (isNewDoc && config?.generated === "uuid" && !value) {
          value = (0, import_crypto.randomUUID)();
        }
        processedData[key] = value !== void 0 ? value : null;
      }
      const DynamicModel = options.customConstructor || class extends SheetDocument {
        async save() {
          return await repository.save(this);
        }
        async remove() {
          return await repository.delete(this);
        }
        async populate(path) {
          return this;
        }
      };
      const hydratedDoc = new DynamicModel(processedData, repository, isNewDoc, entityClass);
      hydratedDoc._entityClass = entityClass;
      if (dataToProcess[ROW_INDEX_SYMBOL] !== void 0) {
        hydratedDoc[ROW_INDEX_SYMBOL] = dataToProcess[ROW_INDEX_SYMBOL];
      }
      const descriptors = Object.getOwnPropertyDescriptors(targetPrototype);
      for (const [key, descriptor] of Object.entries(descriptors)) {
        if (descriptor.get && key !== "constructor") {
          Object.defineProperty(hydratedDoc, key, {
            get: descriptor.get.bind(hydratedDoc),
            enumerable: true,
            configurable: true
          });
        }
      }
      return hydratedDoc;
    } catch (error) {
      this.logger.error(`[Hydrator] \u274C Error cr\xEDtico hidratando "${entityClass.name}": ${error.message}`);
      throw error;
    }
  }
};
SheetDocumentHydrator = _ts_decorate8([
  (0, import_common8.Injectable)(),
  _ts_metadata5("design:type", Function),
  _ts_metadata5("design:paramtypes", [
    typeof SheetDataTransformer === "undefined" ? Object : SheetDataTransformer
  ])
], SheetDocumentHydrator);

// src/core/engine/populate.engine.ts
var import_common9 = require("@nestjs/common");

// src/core/engine/populate.utils.ts
function buildPopulateTree(paths) {
  const root = {};
  for (const path of paths) {
    const parts = path.split(".");
    let current = root;
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
  }
  return root;
}
__name(buildPopulateTree, "buildPopulateTree");

// src/core/model/model.registry.ts
var ODM_MODELS_GLOBAL_KEY = /* @__PURE__ */ Symbol.for("sheetOdm.global_model_store");
if (!globalThis[ODM_MODELS_GLOBAL_KEY]) {
  globalThis[ODM_MODELS_GLOBAL_KEY] = /* @__PURE__ */ new Map();
}
var ModelRegistry = class {
  static {
    __name(this, "ModelRegistry");
  }
  static register(entityName, model) {
    globalThis[ODM_MODELS_GLOBAL_KEY].set(entityName, model);
  }
  static get(entityName) {
    return globalThis[ODM_MODELS_GLOBAL_KEY].get(entityName);
  }
};

// src/core/engine/populate.engine.ts
function _ts_decorate9(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate9, "_ts_decorate");
function _ts_metadata6(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata6, "_ts_metadata");
var PopulateEngine = class _PopulateEngine {
  static {
    __name(this, "PopulateEngine");
  }
  metadataRegistry;
  logger = new import_common9.Logger(_PopulateEngine.name);
  constructor(metadataRegistry) {
    this.metadataRegistry = metadataRegistry;
  }
  /**
   * Punto de entrada principal
   */
  async populate(documents, entityClass, populateInput) {
    if (!documents || documents.length === 0) {
      this.logger.verbose(`[populate] No hay documentos para poblar en ${entityClass.name}.`);
      return documents;
    }
    const paths = Array.isArray(populateInput) ? populateInput : [
      populateInput
    ];
    const tree = buildPopulateTree(paths);
    this.logger.debug(`[populate] \u{1F4C2} Iniciando proceso para [${entityClass.name}]. Documentos base: ${documents.length}. Paths solicitados: [${paths.join(", ")}]`);
    await this.populateLevel(documents, entityClass, tree);
    this.logger.debug(`[populate] \u2705 Proceso de populaci\xF3n finalizado con \xE9xito para [${entityClass.name}].`);
    return documents;
  }
  async populateLevel(documents, entityClass, tree) {
    const populateKeys = Object.keys(tree);
    if (populateKeys.length === 0) return;
    for (const propertyName of populateKeys) {
      this.logger.debug(`  \u2514\u2500\u2500 \u{1F50D} Procesando propiedad relacional: '${propertyName}' en la entidad ${entityClass.name}`);
      const relationConfig = this.metadataRegistry.getRelationOptions(entityClass, propertyName);
      if (!relationConfig) {
        this.logger.warn(`  \u251C\u2500\u2500 \u26A0\uFE0F Relaci\xF3n '${propertyName}' no encontrada en los metadatos de ${entityClass.name}. Saltando.`);
        continue;
      }
      const targetClass = relationConfig.targetEntity();
      const targetPK = this.metadataRegistry.getPrimaryKeyField(targetClass);
      const localPK = this.metadataRegistry.getPrimaryKeyField(entityClass);
      const joinColumn = relationConfig.joinColumn;
      if (!joinColumn) {
        this.logger.error(`  \u251C\u2500\u2500 \u274C Error Cr\xEDtico: 'joinColumn' es undefined para '${propertyName}' en ${entityClass.name}.`);
        continue;
      }
      const targetModel = ModelRegistry.get(targetClass.name);
      if (!targetModel) {
        this.logger.error(`  \u251C\u2500\u2500 \u274C Modelo no registrado en ModelRegistry: ${targetClass.name}. Verifica el 'forFeature'.`);
        continue;
      }
      let relatedDocs = [];
      if (relationConfig.isMany) {
        const parentIds = [
          ...new Set(documents.map((d) => d[localPK]))
        ].filter(Boolean);
        this.logger.verbose(`  \u251C\u2500\u2500 [Batch-Load] Extrayendo IDs locales (${localPK}) de ${entityClass.name}. Encontrados: ${parentIds.length} IDs \xFAnicos.`);
        if (parentIds.length > 0) {
          const queryFilter = {
            [joinColumn]: {
              $in: parentIds
            }
          };
          this.logger.verbose(`  \u251C\u2500\u2500 [Query] Buscando en [${targetClass.name}] con filtro: ${JSON.stringify(queryFilter)}`);
          relatedDocs = await targetModel.find(queryFilter);
        }
      } else {
        const foreignIds = [
          ...new Set(documents.map((d) => d[joinColumn]))
        ].filter(Boolean);
        this.logger.verbose(`  \u251C\u2500\u2500 [Batch-Load] Extrayendo FKs (${joinColumn}) de ${entityClass.name}. Encontradas: ${foreignIds.length} FKs \xFAnicas.`);
        if (foreignIds.length > 0) {
          const queryFilter = {
            [targetPK]: {
              $in: foreignIds
            }
          };
          this.logger.verbose(`  \u251C\u2500\u2500 [Query] Buscando en [${targetClass.name}] con filtro: ${JSON.stringify(queryFilter)}`);
          relatedDocs = await targetModel.find(queryFilter);
        }
      }
      this.logger.debug(`  \u251C\u2500\u2500 \u{1F4E6} Documentos relacionados recuperados de la base de datos: ${relatedDocs.length}`);
      const map2 = /* @__PURE__ */ new Map();
      for (const doc of relatedDocs) {
        const key = relationConfig.isMany ? doc[joinColumn] : doc[targetPK];
        if (!map2.has(key)) {
          map2.set(key, relationConfig.isMany ? [] : null);
        }
        if (relationConfig.isMany) {
          map2.get(key).push(doc);
        } else {
          map2.set(key, doc);
        }
      }
      let injectionCount = 0;
      for (const doc of documents) {
        const key = relationConfig.isMany ? doc[localPK] : doc[joinColumn];
        const dataToInject = map2.get(key) || (relationConfig.isMany ? [] : null);
        doc[propertyName] = dataToInject;
        if (relationConfig.isMany ? dataToInject.length > 0 : dataToInject !== null) {
          injectionCount++;
        }
      }
      this.logger.debug(`  \u251C\u2500\u2500 \u{1F489} Inyecci\xF3n completada. [${injectionCount}/${documents.length}] documentos de ${entityClass.name} recibieron datos para '${propertyName}'.`);
      const nextLevelTree = tree[propertyName];
      if (Object.keys(nextLevelTree).length > 0 && relatedDocs.length > 0) {
        this.logger.debug(`  \u2514\u2500\u2500 \u{1F504} Avanzando al siguiente nivel de profundidad de poblaci\xF3n para '${propertyName}'...`);
        await this.populateLevel(relatedDocs, targetClass, nextLevelTree);
      }
    }
  }
};
PopulateEngine = _ts_decorate9([
  (0, import_common9.Injectable)(),
  _ts_metadata6("design:type", Function),
  _ts_metadata6("design:paramtypes", [
    typeof MetadataRegistry === "undefined" ? Object : MetadataRegistry
  ])
], PopulateEngine);

// src/core/query/query.engine.ts
var import_common11 = require("@nestjs/common");

// src/stages/transform.operators.ts
var import_common10 = require("@nestjs/common");
var import_dayjs2 = __toESM(require("dayjs"));
var import_customParseFormat = __toESM(require("dayjs/plugin/customParseFormat"));
function _ts_decorate10(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate10, "_ts_decorate");
import_dayjs2.default.extend(import_customParseFormat.default);
var IfOperator = class {
  static {
    __name(this, "IfOperator");
  }
  name = "$if";
  schema = [
    "if",
    "then",
    "else"
  ];
  exec(args, record, engine) {
    const condition = engine.evaluate(args.if, record);
    return condition ? engine.evaluate(args.then, record) : engine.evaluate(args.else, record);
  }
};
IfOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], IfOperator);
var MultiplyOperator = class {
  static {
    __name(this, "MultiplyOperator");
  }
  name = "$multiply";
  // No declaramos schema estricto porque acepta un array variádico de factores
  exec(args, record, engine) {
    const input = args.values !== void 0 ? args.values : args.val;
    const values = Array.isArray(input) ? input : [
      input
    ];
    if (values.length === 0) return 0;
    return values.reduce((acc, curr) => {
      const evaluated = engine.evaluate(curr, record);
      const num = typeof evaluated === "string" ? parseFloat(evaluated.replace(/[^\d.-]/g, "")) : Number(evaluated);
      return acc * (isNaN(num) ? 0 : num);
    }, 1);
  }
};
MultiplyOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], MultiplyOperator);
var IncOperator = class {
  static {
    __name(this, "IncOperator");
  }
  name = "$inc";
  schema = [
    "current",
    "val"
  ];
  exec(args, record, engine) {
    const current = Number(engine.evaluate(args.current, record) || 0);
    const val = Number(engine.evaluate(args.val, record) || 0);
    return (isNaN(current) ? 0 : current) + (isNaN(val) ? 0 : val);
  }
};
IncOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], IncOperator);
var MinMaxOperator = class {
  static {
    __name(this, "MinMaxOperator");
  }
  name = "$minMax";
  schema = [
    "current",
    "target",
    "type"
  ];
  exec(args, record, engine) {
    const currentVal = engine.evaluate(args.current, record);
    const target = Number(engine.evaluate(args.target ?? 0, record));
    const type = args.type || "sum";
    if (currentVal === void 0 || currentVal === null || String(currentVal).trim() === "" || isNaN(Number(currentVal))) {
      return isNaN(target) ? 0 : target;
    }
    const current = Number(currentVal);
    return type === "min" ? Math.min(current, target) : Math.max(current, target);
  }
};
MinMaxOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], MinMaxOperator);
var RoundOperator = class {
  static {
    __name(this, "RoundOperator");
  }
  name = "$round";
  schema = [
    "value",
    "decimals"
  ];
  exec(args, record, engine) {
    const rawValue = engine.evaluate(args.value, record);
    const val = typeof rawValue === "string" ? parseFloat(rawValue.replace(/[^\d.-]/g, "")) : parseFloat(rawValue);
    const decimals = Number(engine.evaluate(args.decimals ?? 2, record));
    if (isNaN(val) || isNaN(decimals)) return 0;
    const factor = Math.pow(10, Math.max(0, decimals));
    return Math.round(val * factor) / factor;
  }
};
RoundOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], RoundOperator);
var MathOperator = class {
  static {
    __name(this, "MathOperator");
  }
  name = "$math";
  schema = [
    "expression"
  ];
  exec(args, record, engine) {
    const expression = engine.evaluate(args.expression, record);
    if (!expression || typeof expression !== "string") return 0;
    try {
      const rawData = engine.extractRawData(record);
      const resolved = expression.replace(/\$([a-zA-Z0-9_.]+)/g, (_, fieldPath) => {
        const value = engine.getNestedValue(rawData, fieldPath);
        const num = typeof value === "string" ? parseFloat(value.replace(/[^\d.-]/g, "")) : Number(value);
        return `(${isNaN(num) ? 0 : num})`;
      });
      return Function(`"use strict"; return (${resolved.replace(/[^0-9+\-*/().\s,Mathabsroundceilfloor-]/g, "")})`)();
    } catch {
      return 0;
    }
  }
};
MathOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], MathOperator);
var UpperOperator = class {
  static {
    __name(this, "UpperOperator");
  }
  name = "$upper";
  schema = [
    "val"
  ];
  exec(args, record, engine) {
    const value = engine.evaluate(args.val, record);
    return value !== null && value !== void 0 ? String(value).toUpperCase() : "";
  }
};
UpperOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], UpperOperator);
var TrimOperator = class {
  static {
    __name(this, "TrimOperator");
  }
  name = "$trim";
  schema = [
    "val"
  ];
  exec(args, record, engine) {
    const value = engine.evaluate(args.val, record);
    return value !== null && value !== void 0 ? String(value).trim() : "";
  }
};
TrimOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], TrimOperator);
var ConcatOperator = class {
  static {
    __name(this, "ConcatOperator");
  }
  name = "$concat";
  // Variádico híbrido: soporta { parts: [...] } o un array directo de elementos
  exec(args, record, engine) {
    const input = args.parts !== void 0 ? args.parts : args.val;
    const parts = Array.isArray(input) ? input : [
      input
    ];
    return parts.map((p) => String(engine.evaluate(p, record) ?? "")).join("");
  }
};
ConcatOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], ConcatOperator);
var DateAddOperator = class {
  static {
    __name(this, "DateAddOperator");
  }
  name = "$dateAdd";
  schema = [
    "startDate",
    "amount",
    "unit"
  ];
  exec(args, record, engine) {
    const startDate = engine.evaluate(args.startDate, record);
    const amount = Number(engine.evaluate(args.amount, record) || 0);
    const unit = String(engine.evaluate(args.unit, record) || args.unit || "day");
    const d = engine.safeDayjs(startDate);
    return d ? d.add(amount, unit).format("YYYY-MM-DD HH:mm:ss") : "";
  }
};
DateAddOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], DateAddOperator);
var TimeDiffOperator = class {
  static {
    __name(this, "TimeDiffOperator");
  }
  name = "$timeDiff";
  schema = [
    "start",
    "end",
    "unit"
  ];
  exec(args, record, engine) {
    const startVal = engine.evaluate(args.start, record);
    const endVal = engine.evaluate(args.end, record);
    const unit = String(engine.evaluate(args.unit, record) || args.unit || "hour");
    const start = (0, import_dayjs2.default)(startVal);
    const end = (0, import_dayjs2.default)(endVal);
    if (!start.isValid() || !end.isValid()) return 0;
    const diff = end.diff(start, unit, true);
    return Math.round(diff * 100) / 100;
  }
};
TimeDiffOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], TimeDiffOperator);
var AggregateOperator = class {
  static {
    __name(this, "AggregateOperator");
  }
  name = "$aggregate";
  schema = [
    "values",
    "type"
  ];
  exec(args, record, engine) {
    const inputValues = args.values !== void 0 ? args.values : args.val;
    const rawValues = Array.isArray(inputValues) ? inputValues : [
      inputValues
    ];
    const type = engine.evaluate(args.type, record) || args.type || "sum";
    const nums = rawValues.map((v) => {
      const evaluated = engine.evaluate(v, record);
      if (typeof evaluated === "string") {
        const cleaned = evaluated.replace(/[S\/\.\$\s,]/g, "");
        return parseFloat(cleaned);
      }
      return Number(evaluated);
    }).filter((n) => !isNaN(n));
    if (nums.length === 0) return 0;
    const sum = nums.reduce((a, b) => a + b, 0);
    switch (type) {
      case "sum":
        return sum;
      case "avg":
        return sum / nums.length;
      case "count":
        return nums.length;
      case "min":
        return Math.min(...nums);
      case "max":
        return Math.max(...nums);
      default:
        return sum;
    }
  }
};
AggregateOperator = _ts_decorate10([
  (0, import_common10.Injectable)()
], AggregateOperator);
var DateTransformer = class {
  static {
    __name(this, "DateTransformer");
  }
  static INPUT_FORMAT = "YYYY-MM-DD";
  static SHEET_FORMAT = "DD/MM/YY";
  // Podemos añadir un timezone por defecto si tu sistema lo requiere (ej. Lima/Perú)
  static DEFAULT_TIMEZONE = "America/Lima";
  static toSheet(val) {
    if (!val) return "";
    const d = this.parse(val);
    return d && d.isValid() ? d.format(this.SHEET_FORMAT) : val;
  }
  static fromSheet(val) {
    if (!val) return "";
    const d = this.parse(val);
    return d && d.isValid() ? d.format(this.INPUT_FORMAT) : val;
  }
  /**
   * 🚀 Método universal de parseo inteligente.
   * Intenta parsear por formato Sheets, por formato ISO o como timestamp/Date.
   */
  static parse(val) {
    if (!val || String(val).trim() === "") return null;
    let d = (0, import_dayjs2.default)(val, this.SHEET_FORMAT, true);
    if (d.isValid()) return d;
    d = (0, import_dayjs2.default)(val, "DD/MM/YYYY", true);
    if (d.isValid()) return d;
    d = (0, import_dayjs2.default)(val);
    return d.isValid() ? d : null;
  }
};
DateTransformer = _ts_decorate10([
  (0, import_common10.Injectable)()
], DateTransformer);

// src/core/query/query.engine.ts
function _ts_decorate11(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate11, "_ts_decorate");
function _ts_metadata7(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata7, "_ts_metadata");
function _ts_param5(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param5, "_ts_param");
var QueryEngine = class _QueryEngine {
  static {
    __name(this, "QueryEngine");
  }
  stages;
  stageRegistry;
  // 🚀 Cambiado a la instancia nativa del Logger de NestJS para mejor formato en consola
  logger = new import_common11.Logger(_QueryEngine.name);
  constructor(stages) {
    this.stages = stages;
    this.stageRegistry = /* @__PURE__ */ new Map();
    for (const stage of this.stages) {
      if (!stage || typeof stage.operator !== "string") {
        throw new Error(`[QueryEngine] Invalid stage injected. A valid 'operator' string is required in ${stage?.constructor?.name || "UnknownStage"}.`);
      }
      this.stageRegistry.set(stage.operator, stage);
    }
    this.logger.log(`\u2699\uFE0F QueryEngine inicializado correctamente. [${this.stageRegistry.size}] operadores registrados.`);
  }
  async execute(data, filter, options) {
    const pipeline = [];
    this.logger.debug(`[execute] Solicitud de consulta. Registros entrantes en memoria: ${data?.length || 0}. Filtro base: ${JSON.stringify(filter)}`);
    const normalizedFilter = this.normalizeFilter(filter);
    if (normalizedFilter && Object.keys(normalizedFilter).length > 0) {
      pipeline.push({
        $match: normalizedFilter
      });
    }
    if (filter && Object.keys(filter).length > 0) {
      pipeline.push({
        $match: filter
      });
    }
    if (options?.sort) {
      pipeline.push({
        $sort: {
          [options.sort.field]: options.sort.order === "ASC" ? 1 : -1
        }
      });
    }
    const skip = options?.skip ?? options?.offset ?? 0;
    if (skip > 0) {
      pipeline.push({
        $skip: skip
      });
    }
    if (options?.limit !== void 0 && options.limit !== null) {
      pipeline.push({
        $limit: options.limit
      });
    }
    if (options?.projection) {
      pipeline.push({
        $project: options.projection
      });
    }
    return await this.aggregate(data, pipeline);
  }
  async aggregate(data, pipeline) {
    if (!pipeline || pipeline.length === 0) {
      this.logger.warn(`[aggregate] Se invoc\xF3 la agregaci\xF3n pero el pipeline est\xE1 vac\xEDo. Retornando datos sin procesar.`);
      return data;
    }
    this.validatePipeline(pipeline);
    let result = [
      ...data
    ];
    this.logger.debug(`[aggregate] Iniciando Pipeline de Agregaci\xF3n con ${pipeline.length} etapas activas.`);
    for (const stage of pipeline) {
      const operator = Object.keys(stage)[0];
      const config = stage[operator];
      const handler = this.stageRegistry.get(operator);
      const countBefore = result.length;
      if (operator === "$match" && result.length > 0) {
        this.logger.debug(`[DIAGNOSTICO-MATCH] Analizando ${result.length} items vs Filtro: ${JSON.stringify(config)}`);
        const sampleItem = result[0];
        const itemKeys = Object.keys(sampleItem);
        this.logger.debug(`[DIAGNOSTICO-MATCH] Keys del item: ${JSON.stringify(itemKeys)}`);
        const filterKeys = Object.keys(config);
        const missingKeys = filterKeys.filter((k) => !itemKeys.includes(k));
        if (missingKeys.length > 0) {
          this.logger.warn(`[DIAGNOSTICO-MATCH] \u26A0\uFE0F ADVERTENCIA: El filtro busca llaves que no existen en los datos: ${JSON.stringify(missingKeys)}`);
        }
      }
      try {
        result = await handler.execute(result, config);
        this.logger.verbose(`   \u251C\u2500\u2500 Stage [${operator}]: Filas antes: ${countBefore} \u27A1\uFE0F Filas remanentes: ${result.length}. Config: ${JSON.stringify(config)}`);
      } catch (error) {
        this.logger.error(`[QueryEngine] \u274C Error cr\xEDtico ejecutando la etapa "${operator}" con la configuraci\xF3n: ${JSON.stringify(config)}`);
        throw new Error(`[QueryEngine] \u274C Error ejecutando etapa "${operator}": ${error.message}`);
      }
    }
    this.logger.debug(`[aggregate] Pipeline completado con \xE9xito. Registros devueltos al repositorio: ${result.length}`);
    return result;
  }
  validatePipeline(pipeline) {
    if (!Array.isArray(pipeline)) {
      throw new Error("[QueryEngine] El pipeline de agregaci\xF3n debe ser obligatoriamente un array.");
    }
    for (const stage of pipeline) {
      const operator = Object.keys(stage)[0];
      const config = stage[operator];
      const handler = this.stageRegistry.get(operator);
      if (!handler) {
        throw new Error(`[QueryEngine] Operador no soportado en la infraestructura actual: ${operator}`);
      }
      try {
        handler.validate(config);
      } catch (error) {
        throw new Error(`[QueryEngine] Validaci\xF3n fallida en la etapa "${operator}": ${error.message}`);
      }
    }
  }
  normalizeFilter(filter) {
    if (!filter) return filter;
    if (typeof filter === "string" && /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(filter)) {
      return DateTransformer.fromSheet(filter);
    }
    if (Array.isArray(filter)) return filter.map((i) => this.normalizeFilter(i));
    if (typeof filter === "object") {
      const normalized = {};
      for (const [key, val] of Object.entries(filter)) {
        normalized[key] = this.normalizeFilter(val);
      }
      return normalized;
    }
    return filter;
  }
};
QueryEngine = _ts_decorate11([
  (0, import_common11.Injectable)(),
  _ts_param5(0, (0, import_common11.Inject)(PIPELINE_STAGE)),
  _ts_metadata7("design:type", Function),
  _ts_metadata7("design:paramtypes", [
    Array
  ])
], QueryEngine);

// src/core/engine/mutationEngine.ts
var import_common12 = require("@nestjs/common");
function _ts_decorate12(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate12, "_ts_decorate");
var MutationEngine = class _MutationEngine {
  static {
    __name(this, "MutationEngine");
  }
  logger = new import_common12.Logger(_MutationEngine.name);
  mutate(updateQuery, currentDoc) {
    const mutatedData = {
      ...currentDoc
    };
    const hasOperators = Object.keys(updateQuery).some((key) => key.startsWith("$"));
    if (!hasOperators) {
      return this.applySet(mutatedData, updateQuery);
    }
    if (updateQuery.$set) {
      this.applySet(mutatedData, updateQuery.$set);
    }
    if (updateQuery.$inc) {
      this.applyInc(mutatedData, updateQuery.$inc);
    }
    if (updateQuery.$unset) {
      this.applyUnset(mutatedData, updateQuery.$unset);
    }
    if (updateQuery.$push) {
      this.applyPush(mutatedData, updateQuery.$push);
    }
    if (updateQuery.$pull) {
      this.applyPull(mutatedData, updateQuery.$pull);
    }
    return mutatedData;
  }
  // =========================================================================
  // LÓGICA INTERNA DE OPERADORES
  // =========================================================================
  applySet(target, payload) {
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        target[key] = payload[key];
      }
    }
    return target;
  }
  applyInc(target, payload) {
    for (const key in payload) {
      const rawVal = payload[key];
      const incValue = Number(rawVal);
      if (isNaN(incValue)) {
        this.logger.warn(`El valor para $inc en ${key} no es num\xE9rico: ${rawVal}`);
        continue;
      }
      const currentVal = Number(target[key] || 0);
      if (isNaN(currentVal)) {
        this.logger.warn(`Intento de aplicar $inc sobre un campo no num\xE9rico: ${key}`);
        continue;
      }
      target[key] = currentVal + incValue;
    }
  }
  applyUnset(target, payload) {
    for (const key in payload) {
      if (payload[key]) {
        target[key] = null;
      }
    }
  }
  applyPush(target, payload) {
    for (const key in payload) {
      if (!target[key]) {
        target[key] = [];
      }
      if (!Array.isArray(target[key])) {
        target[key] = [
          target[key]
        ];
      }
      target[key].push(payload[key]);
    }
  }
  applyPull(target, payload) {
    for (const key in payload) {
      if (Array.isArray(target[key])) {
        target[key] = target[key].filter((item) => item !== payload[key]);
      }
    }
  }
};
MutationEngine = _ts_decorate12([
  (0, import_common12.Injectable)()
], MutationEngine);

// src/stages/filtrado_y_transformacion.ts
var import_common14 = require("@nestjs/common");

// src/stages/StageUtils.ts
var StageUtils = {
  // Para validar stages (como $match, $project)
  validateObject: /* @__PURE__ */ __name((config, stageName) => {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new Error(`${stageName} requiere un objeto de configuraci\xF3n v\xE1lido.`);
    }
  }, "validateObject"),
  // Nuevo: Para validar la data que recibe runStages
  validateArray: /* @__PURE__ */ __name((data, stageName) => {
    if (!Array.isArray(data)) {
      throw new Error(`${stageName} requiere un array de datos v\xE1lido.`);
    }
  }, "validateArray")
};

// src/stages/expression.engine.ts
var import_common13 = require("@nestjs/common");
var import_dayjs3 = __toESM(require("dayjs"));
var import_utc = __toESM(require("dayjs/plugin/utc"));
var import_timezone2 = __toESM(require("dayjs/plugin/timezone"));
var import_customParseFormat2 = __toESM(require("dayjs/plugin/customParseFormat"));
var import_weekOfYear = __toESM(require("dayjs/plugin/weekOfYear"));
function _ts_decorate13(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate13, "_ts_decorate");
function _ts_metadata8(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata8, "_ts_metadata");
function _ts_param6(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param6, "_ts_param");
import_dayjs3.default.extend(import_utc.default);
import_dayjs3.default.extend(import_timezone2.default);
import_dayjs3.default.extend(import_customParseFormat2.default);
import_dayjs3.default.extend(import_weekOfYear.default);
var ExpressionEngine = class _ExpressionEngine {
  static {
    __name(this, "ExpressionEngine");
  }
  transforms;
  filters;
  logger = new import_common13.Logger(_ExpressionEngine.name);
  transformRegistry = /* @__PURE__ */ new Map();
  filterRegistry = /* @__PURE__ */ new Map();
  constructor(transforms, filters) {
    this.transforms = transforms;
    this.filters = filters;
    console.log("TRANSFORMS:", this.transforms);
    this.transforms.forEach((op) => this.transformRegistry.set(op.name, op));
    this.filters.forEach((op) => this.filterRegistry.set(op.name, op));
  }
  execute(record, projection) {
    if (!projection || typeof projection !== "object") return projection;
    if (!record) return {};
    if (Array.isArray(projection)) return projection.map((item) => this.execute(record, item));
    const result = {};
    const rawRecord = this.extractRawData(record);
    for (const key in projection) {
      if (!projection.hasOwnProperty(key)) continue;
      const expression = projection[key];
      if (expression === 1 || expression === true) {
        result[key] = rawRecord[key];
        continue;
      }
      if (this.isOperatorObject(expression)) {
        const operatorKey = Object.keys(expression)[0];
        result[key] = this.runOperator(operatorKey, expression[operatorKey], record);
      } else {
        result[key] = this.evaluate(expression, record);
      }
    }
    return result;
  }
  evaluate(expression, record) {
    if (typeof expression === "string" && expression.startsWith("$")) {
      const fieldPath = expression.substring(1);
      const rawData = this.extractRawData(record);
      const value = this.getNestedValue(rawData, fieldPath);
      return value !== void 0 ? value : null;
    }
    if (expression && typeof expression === "object" && !Array.isArray(expression)) {
      const operator = Object.keys(expression).find((key) => key.startsWith("$"));
      if (operator) {
        return this.runOperator(operator, expression[operator], record);
      }
      const resolvedObj = {};
      for (const k in expression) {
        if (expression.hasOwnProperty(k)) {
          resolvedObj[k] = this.evaluate(expression[k], record);
        }
      }
      return resolvedObj;
    }
    return expression;
  }
  evaluateFilter(record, filter) {
    const rawData = this.extractRawData(record);
    if (!filter || typeof filter !== "object") return true;
    return Object.entries(filter).every(([key, condition]) => {
      if (key === "$and") return condition.every((f) => this.evaluateFilter(rawData, f));
      if (key === "$or") return condition.some((f) => this.evaluateFilter(rawData, f));
      if (key === "$nor") return !condition.some((f) => this.evaluateFilter(rawData, f));
      if (key === "$not") return !this.evaluateFilter(rawData, condition);
      const value = this.getNestedValue(rawData, key);
      return this.compareValue(value, condition, record);
    });
  }
  runOperator(op, config, record) {
    const handler = this.transformRegistry.get(op) || this.filterRegistry.get(op);
    if (!handler) {
      this.logger.warn(`Operador no soportado o no registrado: ${op}`);
      return null;
    }
    const args = this.normalizeArgs(config, handler.schema);
    try {
      return handler.exec(args, record, this);
    } catch (error) {
      this.logger.error(`Error ejecutando operador ${op}: ${error.message}`);
      return null;
    }
  }
  normalizeArgs(config, schema) {
    if (config && typeof config === "object" && !Array.isArray(config)) {
      return config;
    }
    if (Array.isArray(config) && schema) {
      return schema.reduce((acc, key, index) => {
        acc[key] = config[index];
        return acc;
      }, {});
    }
    const defaultKey = schema ? schema[0] : "val";
    return {
      [defaultKey]: config
    };
  }
  compareValue(fieldValue, condition, record) {
    if (condition === null || typeof condition !== "object" || condition instanceof Date) {
      if (fieldValue === condition) return true;
      const date1 = this.safeDayjs(fieldValue);
      const date2 = this.safeDayjs(condition);
      if (date1 && date2 && date1.isValid() && date2.isValid()) {
        return date1.format("YYYY-MM-DD") === date2.format("YYYY-MM-DD");
      }
      return false;
    }
    return Object.entries(condition).every(([operator, targetValue]) => {
      if (operator === "$options") return true;
      if (!operator.startsWith("$")) return fieldValue === targetValue;
      const args = {
        val1: fieldValue,
        val2: targetValue,
        val: fieldValue,
        pattern: targetValue,
        options: condition["$options"] || "i"
      };
      return !!this.runOperator(operator, args, record);
    });
  }
  getNestedValue(obj, path) {
    if (!obj || !path) return void 0;
    return path.split(".").reduce((acc, part) => {
      return acc && typeof acc === "object" && acc[part] !== void 0 ? acc[part] : void 0;
    }, obj);
  }
  extractRawData(item) {
    return item?.data ?? item?._snapshot ?? item;
  }
  safeDayjs(val) {
    return DateTransformer.parse(val);
  }
  isOperatorObject(obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    const keys = Object.keys(obj);
    return keys.length === 1 && keys[0].startsWith("$");
  }
};
ExpressionEngine = _ts_decorate13([
  (0, import_common13.Injectable)(),
  _ts_param6(0, (0, import_common13.Inject)(DATA_TRANSFORM_OPERATOR)),
  _ts_param6(1, (0, import_common13.Inject)(FILTER_OPERATOR)),
  _ts_metadata8("design:type", Function),
  _ts_metadata8("design:paramtypes", [
    Array,
    Array
  ])
], ExpressionEngine);

// src/stages/filtrado_y_transformacion.ts
function _ts_decorate14(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate14, "_ts_decorate");
function _ts_metadata9(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata9, "_ts_metadata");
var MatchStage = class _MatchStage {
  static {
    __name(this, "MatchStage");
  }
  engine;
  operator = "$match";
  logger = new import_common14.Logger(_MatchStage.name);
  constructor(engine) {
    this.engine = engine;
  }
  /**
   * Ejecuta el filtrado en memoria de manera inmutable y tolerante a fallos de celdas.
   * @param data Array de registros (filas de Sheets hidratadas con símbolos de metadatos)
   * @param config Objeto de configuración del operador $match
   */
  async execute(data, config) {
    if (!Array.isArray(data) || data.length === 0) {
      this.logger.verbose(`[${this.operator}] Array de entrada vac\xEDo. Omitiendo evaluaci\xF3n de etapa.`);
      return [];
    }
    if (!config || Object.keys(config).length === 0) {
      this.logger.verbose(`[${this.operator}] Filtro vac\xEDo detectado. Retornando los ${data.length} registros sin filtrar.`);
      return data;
    }
    const matchedRecords = [];
    let errorCount = 0;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (!row || typeof row !== "object") {
        this.logger.warn(`[${this.operator}] Registro en \xEDndice de memoria [${i}] ignorado (no es un objeto evaluable).`);
        continue;
      }
      try {
        const isMatch = this.engine.evaluateFilter(row, config);
        if (isMatch) {
          matchedRecords.push(row);
        }
      } catch (error) {
        errorCount++;
        const sheetRowNumber = row[ROW_INDEX_SYMBOL] !== void 0 ? `Fila Sheets: ${String(row[ROW_INDEX_SYMBOL])}` : `\xCDndice Memoria: ${i}`;
        this.logger.error(`[${this.operator}] \u274C Error evaluando criterio contra registro [${sheetRowNumber}]. Raz\xF3n: ${error.message}`, error.stack);
      }
    }
    if (errorCount > 0) {
      this.logger.warn(`[${this.operator}] \u26A0\uFE0F Se omitieron ${errorCount} fila(s) del resultado debido a errores de sintaxis en sus celdas.`);
    }
    this.logger.verbose(`[${this.operator}] Etapa completada con \xE9xito: ${matchedRecords.length} de ${data.length} registros cumplieron el filtro.`);
    return matchedRecords;
  }
  /**
   * Valida el contrato del operador antes de iniciar el procesamiento del pipeline.
   */
  validate(config) {
    StageUtils.validateObject(config, this.operator);
  }
};
MatchStage = _ts_decorate14([
  (0, import_common14.Injectable)(),
  _ts_metadata9("design:type", Function),
  _ts_metadata9("design:paramtypes", [
    typeof ExpressionEngine === "undefined" ? Object : ExpressionEngine
  ])
], MatchStage);
var ProjectStage = class {
  static {
    __name(this, "ProjectStage");
  }
  engine;
  operator = "$project";
  constructor(engine) {
    this.engine = engine;
  }
  async execute(data, config) {
    return data.map((item) => {
      console.log("[DEBUG] Engine Config:", config);
      const projected = this.engine.execute(item, config) || {};
      if (item && item[ROW_INDEX_SYMBOL] !== void 0) {
        projected[ROW_INDEX_SYMBOL] = item[ROW_INDEX_SYMBOL];
      }
      return projected;
    });
  }
  validate(config) {
    StageUtils.validateObject(config, "$project");
  }
};
ProjectStage = _ts_decorate14([
  (0, import_common14.Injectable)(),
  _ts_metadata9("design:type", Function),
  _ts_metadata9("design:paramtypes", [
    typeof ExpressionEngine === "undefined" ? Object : ExpressionEngine
  ])
], ProjectStage);
var AddFieldsStage = class _AddFieldsStage {
  static {
    __name(this, "AddFieldsStage");
  }
  engine;
  operator = "$addFields";
  logger = new import_common14.Logger(_AddFieldsStage.name);
  constructor(engine) {
    this.engine = engine;
  }
  async execute(data, config) {
    if (!config || Object.keys(config).length === 0) return data;
    try {
      return data.map((item) => {
        const newFields = this.engine.execute(item, config);
        return {
          ...item,
          ...newFields
        };
      });
    } catch (error) {
      this.logger.error(`[AddFieldsStage] Error evaluando configuraci\xF3n: ${JSON.stringify(config)}`, error);
      return data;
    }
  }
  validate(config) {
    StageUtils.validateObject(config, "$addFields");
    if (Object.keys(config).length === 0) {
      throw new Error("[$addFields] requiere un objeto de configuraci\xF3n con al menos un campo.");
    }
  }
};
AddFieldsStage = _ts_decorate14([
  (0, import_common14.Injectable)(),
  _ts_metadata9("design:type", Function),
  _ts_metadata9("design:paramtypes", [
    typeof ExpressionEngine === "undefined" ? Object : ExpressionEngine
  ])
], AddFieldsStage);

// src/stages/orden_y_paginacion.ts
var import_common15 = require("@nestjs/common");
function _ts_decorate15(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate15, "_ts_decorate");
var SortStage = class {
  static {
    __name(this, "SortStage");
  }
  operator = "$sort";
  async execute(data, config) {
    if (!config || Object.keys(config).length === 0) return data;
    return [
      ...data
    ].sort((a, b) => {
      for (const key of Object.keys(config)) {
        const direction = config[key];
        const valA = a[key];
        const valB = b[key];
        if (valA === valB) continue;
        if (valA === void 0 || valA === null || valA === "") return 1;
        if (valB === void 0 || valB === null || valB === "") return -1;
        if (valA instanceof Date && valB instanceof Date) {
          return direction === 1 ? valA.getTime() - valB.getTime() : valB.getTime() - valA.getTime();
        }
        if (valA > valB) return direction === 1 ? 1 : -1;
        if (valA < valB) return direction === 1 ? -1 : 1;
      }
      return 0;
    });
  }
  validate(config) {
    StageUtils.validateObject(config, "$sort");
    for (const key of Object.keys(config)) {
      if (config[key] !== 1 && config[key] !== -1) {
        throw new Error(`[$sort] El valor para ordenar "${key}" debe ser estrictamente 1 (asc) o -1 (desc).`);
      }
    }
  }
};
SortStage = _ts_decorate15([
  (0, import_common15.Injectable)()
], SortStage);
var LimitStage = class {
  static {
    __name(this, "LimitStage");
  }
  operator = "$limit";
  async execute(data, config) {
    const limitAmount = Number(config);
    if (isNaN(limitAmount) || limitAmount <= 0) return [];
    return data.slice(0, limitAmount);
  }
  validate(config) {
    if (typeof config !== "number" || config <= 0) {
      throw new Error("[$limit] El valor debe ser un n\xFAmero entero mayor a cero.");
    }
  }
};
LimitStage = _ts_decorate15([
  (0, import_common15.Injectable)()
], LimitStage);
var SkipStage = class {
  static {
    __name(this, "SkipStage");
  }
  operator = "$skip";
  async execute(data, config) {
    const skipAmount = Number(config);
    if (isNaN(skipAmount) || skipAmount <= 0) return data;
    return data.slice(skipAmount);
  }
  validate(config) {
    if (typeof config !== "number" || config < 0) {
      throw new Error("[$skip] El valor debe ser un n\xFAmero entero positivo o cero.");
    }
  }
};
SkipStage = _ts_decorate15([
  (0, import_common15.Injectable)()
], SkipStage);

// src/stages/filter.operators.ts
var import_common16 = require("@nestjs/common");
function _ts_decorate16(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate16, "_ts_decorate");
var EqOperator = class {
  static {
    __name(this, "EqOperator");
  }
  name = "$eq";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    return engine.evaluate(args.val1, record) === engine.evaluate(args.val2, record);
  }
};
EqOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], EqOperator);
var NeOperator = class {
  static {
    __name(this, "NeOperator");
  }
  name = "$ne";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    return engine.evaluate(args.val1, record) !== engine.evaluate(args.val2, record);
  }
};
NeOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], NeOperator);
var GtOperator = class {
  static {
    __name(this, "GtOperator");
  }
  name = "$gt";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    const v1 = Number(engine.evaluate(args.val1, record));
    const v2 = Number(engine.evaluate(args.val2, record));
    console.log(`[DEBUG Gt] Comparando: ${v1} > ${v2}`);
    return !isNaN(v1) && !isNaN(v2) ? v1 > v2 : false;
  }
};
GtOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], GtOperator);
var GteOperator = class {
  static {
    __name(this, "GteOperator");
  }
  name = "$gte";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    const v1 = Number(engine.evaluate(args.val1, record));
    const v2 = Number(engine.evaluate(args.val2, record));
    return !isNaN(v1) && !isNaN(v2) ? v1 >= v2 : false;
  }
};
GteOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], GteOperator);
var LtOperator = class {
  static {
    __name(this, "LtOperator");
  }
  name = "$lt";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    const v1 = Number(engine.evaluate(args.val1, record));
    const v2 = Number(engine.evaluate(args.val2, record));
    return !isNaN(v1) && !isNaN(v2) ? v1 < v2 : false;
  }
};
LtOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], LtOperator);
var LteOperator = class {
  static {
    __name(this, "LteOperator");
  }
  name = "$lte";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    const v1 = Number(engine.evaluate(args.val1, record));
    const v2 = Number(engine.evaluate(args.val2, record));
    return !isNaN(v1) && !isNaN(v2) ? v1 <= v2 : false;
  }
};
LteOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], LteOperator);
var InOperator = class {
  static {
    __name(this, "InOperator");
  }
  name = "$in";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    const val = engine.evaluate(args.val1, record);
    const arr = engine.evaluate(args.val2, record);
    if (!Array.isArray(arr)) return false;
    const normalizedVal = String(val ?? "").trim();
    return arr.some((item) => String(engine.evaluate(item, record) ?? "").trim() === normalizedVal);
  }
};
InOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], InOperator);
var NinOperator = class {
  static {
    __name(this, "NinOperator");
  }
  name = "$nin";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    const inOp = new InOperator();
    return !inOp.exec(args, record, engine);
  }
};
NinOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], NinOperator);
var ExistsOperator = class {
  static {
    __name(this, "ExistsOperator");
  }
  name = "$exists";
  schema = [
    "val"
  ];
  exec(args, record, engine) {
    const val = engine.evaluate(args.val, record);
    return val !== void 0 && val !== null && String(val).trim() !== "";
  }
};
ExistsOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], ExistsOperator);
var RegexOperator = class {
  static {
    __name(this, "RegexOperator");
  }
  name = "$regex";
  schema = [
    "val",
    "pattern",
    "options"
  ];
  exec(args, record, engine) {
    const val = String(engine.evaluate(args.val, record) || "");
    const pattern = engine.evaluate(args.pattern, record);
    const options = engine.evaluate(args.options, record) || args.options || "i";
    if (!pattern) return false;
    try {
      return new RegExp(pattern, options).test(val);
    } catch {
      return false;
    }
  }
};
RegexOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], RegexOperator);
var SameWeekOperator = class {
  static {
    __name(this, "SameWeekOperator");
  }
  name = "$sameWeek";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    const d1 = engine.safeDayjs(args.val1);
    const d2 = engine.safeDayjs(args.val2);
    if (!d1 || !d2) return false;
    return d1.year() === d2.year() && d1.week() === d2.week();
  }
};
SameWeekOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], SameWeekOperator);
var DayOfWeekOperator = class {
  static {
    __name(this, "DayOfWeekOperator");
  }
  name = "$dayOfWeek";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    const d = engine.safeDayjs(args.val1);
    if (!d) return false;
    const targetDay = Number(engine.evaluate(args.val2, record));
    return d.day() === targetDay;
  }
};
DayOfWeekOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], DayOfWeekOperator);
var YearWeekOperator = class {
  static {
    __name(this, "YearWeekOperator");
  }
  name = "$yearWeek";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    const d = engine.safeDayjs(args.val1);
    if (!d) return false;
    const target = args.val2;
    let targetYear, targetWeek;
    if (typeof target === "string" && target.includes("-W")) {
      const [y, w] = target.split("-W");
      targetYear = Number(y);
      targetWeek = Number(w);
    } else if (typeof target === "object") {
      targetYear = Number(target.year);
      targetWeek = Number(target.week);
    } else {
      return false;
    }
    return d.year() === targetYear && d.week() === targetWeek;
  }
};
YearWeekOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], YearWeekOperator);
var DateBetweenOperator = class {
  static {
    __name(this, "DateBetweenOperator");
  }
  name = "$dateBetween";
  schema = [
    "val1",
    "val2"
  ];
  exec(args, record, engine) {
    const d = engine.safeDayjs(args.val1);
    if (!d || !Array.isArray(args.val2) || args.val2.length !== 2) return false;
    const start = engine.safeDayjs(args.val2[0]);
    const end = engine.safeDayjs(args.val2[1]);
    if (!start || !end) return false;
    return (d.isSame(start, "day") || d.isAfter(start, "day")) && (d.isSame(end, "day") || d.isBefore(end, "day"));
  }
};
DateBetweenOperator = _ts_decorate16([
  (0, import_common16.Injectable)()
], DateBetweenOperator);

// src/adapters/postgres.provider.ts
var import_common17 = require("@nestjs/common");
var import_pg = require("pg");
var import_auth5 = require("@spreadsheet/auth");
function _ts_decorate17(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate17, "_ts_decorate");
function _ts_metadata10(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata10, "_ts_metadata");
function _ts_param7(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param7, "_ts_param");
var PostgresProvider = class _PostgresProvider {
  static {
    __name(this, "PostgresProvider");
  }
  config;
  logger = new import_common17.Logger(_PostgresProvider.name);
  pool;
  constructor(config) {
    this.config = config;
  }
  // Inicializamos la conexión automáticamente al arrancar NestJS
  async onApplicationBootstrap() {
    await this.connect();
    await this.syncOutboxSchema();
  }
  /**
   * Sincroniza el esquema de la base de datos:
   * 1. Crea la tabla si no existe.
   * 2. Verifica y añade columnas faltantes (evolución del esquema).
   */
  async syncOutboxSchema() {
    try {
      const createTableQuery = `
                CREATE TABLE IF NOT EXISTS outbox_entries (
                    id BIGSERIAL PRIMARY KEY,
                    entity_name VARCHAR(255) NOT NULL,
                    operation VARCHAR(50) NOT NULL,
                    status VARCHAR(50) DEFAULT 'PENDING',
                    sheet_name VARCHAR(255) NOT NULL,
                    payload JSONB NOT NULL,
                    attempts INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    started_at TIMESTAMP,
                    finished_at TIMESTAMP,
                    error TEXT
                );
            `;
      await this.pool.query(createTableQuery);
      await this.addColumnIfMissing("outbox_entries", "next_attempt_at", "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP");
      await this.pool.query(`
                CREATE INDEX IF NOT EXISTS idx_outbox_processor_retry 
                ON outbox_entries (status, next_attempt_at ASC);
            `);
      await this.pool.query(`
            CREATE TABLE IF NOT EXISTS read_logs (
                id BIGSERIAL PRIMARY KEY,
                sheet_name VARCHAR(255) NOT NULL,
                operation VARCHAR(50) NOT NULL,
                latency_ms INT DEFAULT 0,
                success BOOLEAN DEFAULT TRUE,
                error TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
      this.logger.log("\u{1F4CA} Esquema de [outbox_entries] sincronizado correctamente.");
    } catch (error) {
      this.logger.error(`\u274C Error al sincronizar esquema de Outbox: ${error.message}`);
      throw error;
    }
  }
  /**
   * Verifica si una columna existe y la crea si es necesario
   */
  async addColumnIfMissing(tableName, columnName, columnType) {
    const checkQuery = `
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = $1 AND column_name = $2;
        `;
    const res = await this.pool.query(checkQuery, [
      tableName,
      columnName
    ]);
    if (res.rowCount === 0) {
      this.logger.warn(`\u26A0\uFE0F Columna '${columnName}' no encontrada en '${tableName}'. Cre\xE1ndola...`);
      await this.pool.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`);
      this.logger.log(`\u2705 Columna '${columnName}' a\xF1adida con \xE9xito.`);
    }
  }
  async connect() {
    const pgConfig = this.config.postgres;
    if (!pgConfig) {
      this.logger.warn("\u26A0\uFE0F Configuraci\xF3n de Postgres no proporcionada.");
      return;
    }
    this.pool = new import_pg.Pool({
      host: pgConfig.host,
      port: pgConfig.port,
      user: pgConfig.username,
      password: pgConfig.password,
      database: pgConfig.database,
      ssl: pgConfig.ssl ? {
        rejectUnauthorized: false
      } : false,
      idleTimeoutMillis: 3e4,
      max: 20
    });
    await this.pool.query("SELECT 1");
    this.logger.log("\u2705 Pool de conexiones de Postgres inicializado.");
  }
  async checkHealth() {
    if (!this.pool) return {
      status: "down",
      message: "Pool de Postgres no inicializado"
    };
    const startTime = Date.now();
    try {
      const client = await this.pool.connect();
      await client.query("SELECT 1");
      client.release();
      return {
        status: "up",
        latency: Date.now() - startTime,
        message: "Conexi\xF3n a base de datos exitosa"
      };
    } catch (error) {
      this.logger.error(`Error en checkHealth de Postgres: ${error.message}`);
      return {
        status: "down",
        latency: Date.now() - startTime,
        message: error.message
      };
    }
  }
  async disconnect() {
    if (this.pool) {
      await this.pool.end();
      this.logger.log("\u{1F50C} Pool de conexiones de Postgres cerrado limpiamente.");
    }
  }
  // --- Métodos de operación para el resto de la librería ---
  async query(text, params) {
    if (!this.pool) throw new Error("PostgresProvider no est\xE1 inicializado.");
    return this.pool.query(text, params);
  }
  async getClient() {
    if (!this.pool) throw new Error("PostgresProvider no est\xE1 inicializado.");
    return this.pool.connect();
  }
};
PostgresProvider = _ts_decorate17([
  (0, import_common17.Injectable)(),
  _ts_param7(0, (0, import_common17.Inject)(import_auth5.SHEET_ODM_OPTIONS)),
  _ts_metadata10("design:type", Function),
  _ts_metadata10("design:paramtypes", [
    typeof SheetOdmModuleOptions === "undefined" ? Object : SheetOdmModuleOptions
  ])
], PostgresProvider);

// src/infrastructure/InfrastructureProvisioner.ts
var import_common18 = require("@nestjs/common");
function _ts_decorate18(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate18, "_ts_decorate");
function _ts_metadata11(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata11, "_ts_metadata");
var InfrastructureProvisioner = class _InfrastructureProvisioner {
  static {
    __name(this, "InfrastructureProvisioner");
  }
  gateway;
  registry;
  logger = new import_common18.Logger(_InfrastructureProvisioner.name);
  constructor(gateway, registry) {
    this.gateway = gateway;
    this.registry = registry;
  }
  /**
   * Sincroniza de forma óptima el esquema local (Entidades) con Google Sheets
   */
  async syncSchema() {
    const entities = MetadataRegistry.getAllRegisteredEntities();
    if (!entities || entities.length === 0) {
      this.logger.warn("\u26A0\uFE0F No se encontraron entidades registradas en el MetadataRegistry.");
      return;
    }
    const existingSheets = await this.gateway.getExistingSheetTitles();
    const existingSheetsUpper = new Set(existingSheets.map((s) => s.toUpperCase()));
    const archiveConfig = {};
    for (const entity of entities) {
      const dto = Reflect.getMetadata(SHEETS_DTO, entity);
      if (!dto) {
        throw new Error(`\u274C [ODM Error] La entidad ${entity.name} no tiene un DTO vinculado. Define { dto: TuDto } en @Table.`);
      }
      this.validateSchemaConsistency(entity, dto);
      const sheetName = (Reflect.getMetadata(SHEETS_TABLE_NAME, entity) || entity.name).toUpperCase();
      archiveConfig[sheetName] = `${sheetName}_HISTORICO`;
      const definedHeaders = this.getHeadersForEntity(entity);
      const sheetExists = existingSheetsUpper.has(sheetName);
      if (!sheetExists) {
        await this.provisionNewSheet(sheetName, definedHeaders);
        existingSheetsUpper.add(sheetName);
      } else {
        await this.migrateExistingSheet(sheetName, definedHeaders);
      }
    }
    await this.syncConfigSheet(archiveConfig, existingSheetsUpper);
  }
  async syncConfigSheet(config, existingSheetsUpper) {
    const configSheetName = "_CONFIG";
    if (!existingSheetsUpper.has(configSheetName)) {
      await this.gateway.createSheet(configSheetName);
    }
    await this.gateway.writeHeaders(configSheetName, [
      "CONFIG_JSON"
    ]);
    await this.gateway.updateRow(configSheetName, 2, [
      JSON.stringify(config)
    ]);
    this.logger.log(`\u2705 Configuraci\xF3n de archivado escrita en la hoja "${configSheetName}".`);
  }
  async provisionNewSheet(sheetName, headers) {
    this.logger.log(`\u{1F4E1} Creando pesta\xF1a nueva: "${sheetName}"`);
    await this.gateway.createSheet(sheetName);
    await this.gateway.writeHeaders(sheetName, headers);
    this.logger.log(`\u2705 Pesta\xF1a "${sheetName}" creada con cabeceras: [${headers.join(", ")}]`);
  }
  // 🔥 MEJORA CRÍTICA: Migración inteligente In-Place para Asteriscos de Índices
  async migrateExistingSheet(sheetName, definedHeaders) {
    const actualRows = await this.gateway.getRange(`${sheetName}!1:1`);
    const currentHeaders = actualRows && actualRows[0] ? actualRows[0].map((h) => String(h).trim()) : [];
    const cleanHeader = /* @__PURE__ */ __name((h) => h.replace(/\*$/, "").trim().toUpperCase(), "cleanHeader");
    const definedHeadersMap = /* @__PURE__ */ new Map();
    definedHeaders.forEach((h) => definedHeadersMap.set(cleanHeader(h), h));
    const currentHeadersCleanSet = new Set(currentHeaders.map(cleanHeader));
    let hasChanges = false;
    const updatedCurrentHeaders = currentHeaders.map((current) => {
      const cleanCurrent = cleanHeader(current);
      const matchedDefined = definedHeadersMap.get(cleanCurrent);
      if (matchedDefined) {
        if (current !== matchedDefined) {
          hasChanges = true;
        }
        return matchedDefined;
      }
      return current;
    });
    const missingHeaders = definedHeaders.filter((h) => !currentHeadersCleanSet.has(cleanHeader(h)));
    if (missingHeaders.length > 0) {
      hasChanges = true;
    }
    if (hasChanges) {
      const finalHeaders = [
        ...updatedCurrentHeaders,
        ...missingHeaders
      ];
      this.logger.log(`\u{1F504} Sincronizando \xEDndices/columnas en "${sheetName}"...`);
      if (missingHeaders.length > 0) {
        this.logger.log(`\u2795 Nuevas columnas acopladas al final: [${missingHeaders.join(", ")}]`);
      }
      await this.gateway.writeHeaders(sheetName, finalHeaders);
      this.logger.log(`\u2705 Estructura e \xEDndices de "${sheetName}" actualizados sin alterar el orden de los datos.`);
    }
  }
  validateSchemaConsistency(entity, dto) {
    const colDetails = this.registry.getColumnDetails(entity);
    const entityFields = Object.keys(colDetails);
    const dtoInstance = new dto();
    const dtoFields = /* @__PURE__ */ new Set([
      ...Object.getOwnPropertyNames(dtoInstance),
      ...Object.getOwnPropertyNames(dto.prototype)
    ]);
    for (const field of entityFields) {
      if (field === "constructor") continue;
      const dtoFieldType = Reflect.getMetadata("design:type", dto.prototype, field);
      if (!dtoFields.has(field) && !dtoFieldType) {
        throw new Error(`\u274C [ODM Error] La entidad '${entity.name}' define la columna '${field}', pero no existe o no est\xE1 inicializada en el DTO '${dto.name}'.`);
      }
      const entityColumnType = colDetails[field].type;
      if (entityColumnType && dtoFieldType) {
        const dtoTypeName = dtoFieldType.name.toLowerCase();
        if (entityColumnType !== dtoTypeName) {
          throw new Error(`\u274C [ODM Error] Inconsistencia en '${field}'. DTO '${dto.name}' espera tipo '${dtoTypeName}', pero la Entidad define '${entityColumnType}'.`);
        }
      }
    }
  }
  // 🔥 REFACTORIZACIÓN CORE: Inyección dinámica del Asterisco basado en los metadatos del decorador
  getHeadersForEntity(entity) {
    const colDetails = this.registry.getColumnDetails(entity);
    const colMap = this.registry.getColumnMap(entity);
    return Object.entries(colMap).sort(([, a], [, b]) => a - b).map(([propName]) => {
      const colConfig = colDetails[propName];
      const baseName = (colConfig?.name ? colConfig.name : propName).toUpperCase();
      return colConfig?.index ? `${baseName}*` : baseName;
    });
  }
};
InfrastructureProvisioner = _ts_decorate18([
  (0, import_common18.Injectable)(),
  _ts_metadata11("design:type", Function),
  _ts_metadata11("design:paramtypes", [
    typeof SheetDataGateway === "undefined" ? Object : SheetDataGateway,
    typeof MetadataRegistry === "undefined" ? Object : MetadataRegistry
  ])
], InfrastructureProvisioner);

// src/core/outbox/outbox.module.ts
var import_common22 = require("@nestjs/common");

// src/core/outbox/services/postgres-outbox.service.ts
var import_common19 = require("@nestjs/common");
function _ts_decorate19(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate19, "_ts_decorate");
function _ts_metadata12(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata12, "_ts_metadata");
function _ts_param8(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param8, "_ts_param");
var PostgresOutboxService = class _PostgresOutboxService extends OutboxService {
  static {
    __name(this, "PostgresOutboxService");
  }
  pg;
  logger = new import_common19.Logger(_PostgresOutboxService.name);
  constructor(pg) {
    super(), this.pg = pg;
  }
  async saveTransaction(entries) {
    if (!entries || entries.length === 0) return;
    const columns = [
      "entity_name",
      "operation",
      "status",
      "sheet_name",
      "payload",
      "attempts"
    ];
    const values = [];
    const placeholders = entries.map((entry, index) => {
      const baseIndex = index * columns.length;
      const rowPlaceholders = columns.map((_, colIndex) => `$${baseIndex + colIndex + 1}`).join(", ");
      const finalPayload = entry.payload || entry.doc || {};
      values.push(entry.entityName, entry.operation, entry.status || OutboxStatus.PENDING, entry.sheetName, typeof finalPayload === "object" ? JSON.stringify(finalPayload) : finalPayload, entry.attempts || 0);
      return `(${rowPlaceholders})`;
    }).join(", ");
    const queryText = `INSERT INTO outbox_entries (${columns.join(", ")}) VALUES ${placeholders}`;
    const client = await this.pg.getClient();
    try {
      await client.query("BEGIN");
      await client.query(queryText, values);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      this.logger.error(`\u274C Error en saveTransaction: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }
  async enqueue(entry) {
    const query = `
    INSERT INTO outbox_entries (
      entity_name, 
      operation, 
      status, 
      sheet_name, 
      payload, 
      attempts, 
      created_at, 
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
    const values = [
      entry.entityName,
      entry.operation,
      "PENDING",
      entry.sheetName,
      JSON.stringify(entry.payload),
      0,
      /* @__PURE__ */ new Date(),
      /* @__PURE__ */ new Date()
      // updated_at
    ];
    try {
      await this.pg.query(query, values);
    } catch (error) {
      throw new Error(`\u274C Fallo cr\xEDtico al encolar en Outbox: ${error.message}`);
    }
  }
};
PostgresOutboxService = _ts_decorate19([
  (0, import_common19.Injectable)(),
  _ts_param8(0, (0, import_common19.Inject)("POSTGRES_PROVIDER")),
  _ts_metadata12("design:type", Function),
  _ts_metadata12("design:paramtypes", [
    typeof IPostgresProvider === "undefined" ? Object : IPostgresProvider
  ])
], PostgresOutboxService);

// src/core/outbox/outbox.processor.ts
var import_common21 = require("@nestjs/common");
var import_core = require("@nestjs/core");

// src/utils/getRepositoryToken.ts
var getRepositoryToken = /* @__PURE__ */ __name((entity) => `SheetsRepository_${entity.name}`, "getRepositoryToken");

// src/core/outbox/outbox.processor.ts
var import_cache_manager = require("@nestjs/cache-manager");

// src/core/cache/cache.keys.ts
var CacheKeys = {
  /**
   * 📊 Clave para almacenar todos los registros crudos de una hoja.
   * Usada en: fetchRawData y getRawData
   */
  SHEET_DATA: /* @__PURE__ */ __name((sheetName) => `sheet_data_${sheetName}`, "SHEET_DATA"),
  /**
   * 🔍 Clave para una búsqueda indexada única (Read Gateway)
   * Usada cuando filtras por ID o columna única.
   */
  INDEXED_READ_SINGLE: /* @__PURE__ */ __name((sheetName, column, value) => `sheet_read_single_${sheetName}_${column}_${value}`, "INDEXED_READ_SINGLE"),
  /**
   * 📚 Clave para búsquedas indexadas múltiples (Read Gateway)
   * Usada cuando filtras por una llave foránea o estado.
   */
  INDEXED_READ_MANY: /* @__PURE__ */ __name((sheetName, column, value) => `sheet_read_many_${sheetName}_${column}_${value}`, "INDEXED_READ_MANY"),
  /**
   * ⚙️ Clave para la metadata compilada (Opcional)
   * Muy útil si en el futuro decides cachear los esquemas de las entidades
   * para no usar reflection en cada petición.
   */
  SCHEMA_METADATA: /* @__PURE__ */ __name((entityName) => `schema_meta_${entityName}`, "SCHEMA_METADATA")
};

// src/core/model/model.factory.ts
var import_common20 = require("@nestjs/common");
var InjectModel = /* @__PURE__ */ __name((entity) => (0, import_common20.Inject)(`${entity.name}Model`), "InjectModel");
function createModel(entityClass, repo) {
  let DocumentModel = class DocumentModel2 {
    static {
      __name(this, "DocumentModel");
    }
    logger;
    constructor(data = {}) {
      Object.defineProperty(this, "logger", {
        value: new import_common20.Logger(`Model<${entityClass.name}>`),
        writable: false,
        enumerable: false
      });
      this.logger.debug(`[FLOW-2] Datos recibidos en Constructor: ${Object.keys(data).length} keys.`);
      Object.assign(this, data);
      const primaryKeyProperty = Reflect.getMetadata(SHEETS_PRIMARY_KEY, entityClass) || "id";
      if (!this[primaryKeyProperty]) {
        const details = Reflect.getMetadata(SHEETS_COLUMN_DETAILS, entityClass) || {};
        const pkConfig = details[primaryKeyProperty];
        if (pkConfig?.generated === "short-id") {
          this[primaryKeyProperty] = IdFactory.createShort();
          this.logger.debug(`[FLOW-ID] Generado short-id autom\xE1tico en constructor: ${this[primaryKeyProperty]}`);
        } else if (pkConfig?.generated === "uuid" || pkConfig?.generated === "increment") {
          this[primaryKeyProperty] = IdFactory.createUUID();
          this.logger.debug(`[FLOW-ID] Generado UUID autom\xE1tico en constructor: ${this[primaryKeyProperty]}`);
        }
      }
      Object.defineProperty(this, "__isNew", {
        value: data[ROW_INDEX_SYMBOL] === void 0,
        writable: true,
        enumerable: false
      });
      Object.defineProperty(this, "__modifiedPaths", {
        value: /* @__PURE__ */ new Set(),
        writable: true,
        enumerable: false
      });
      return new Proxy(this, {
        set(target, prop, value, receiver) {
          if (target[prop] !== value) {
            target.__modifiedPaths.add(prop);
          }
          return Reflect.set(target, prop, value, receiver);
        }
      });
    }
    // ====================================================================
    // 📝 SERIALIZACIÓN BLINDADA CORREGIDA Y AUDITADA
    // ====================================================================
    toJSON() {
      const plain = {};
      const details = Reflect.getMetadata(SHEETS_COLUMN_DETAILS, entityClass) || {};
      const descriptors = Object.getOwnPropertyDescriptors(entityClass.prototype);
      const metadataKeys = Object.keys(details);
      this.logger.debug(`[FLOW-METADATA] Inspeccionando @Column en [${entityClass.name}]. Encontradas: [${metadataKeys.join(", ")}]`);
      if (metadataKeys.length > 0) {
        for (const col of metadataKeys) {
          plain[col] = this[col] !== void 0 ? this[col] : null;
        }
      } else {
        this.logger.warn(`\u26A0\uFE0F [FLOW-SERIALIZE] No se hallaron metadatos @Column en [${entityClass.name}]. Usando fallback de seguridad por reflexi\xF3n superficial.`);
        for (const key of Object.keys(this)) {
          if (typeof this[key] !== "function" && !key.startsWith("__")) {
            plain[key] = this[key];
          }
        }
      }
      for (const key of metadataKeys) {
        let val = this[key];
        if (details[key]?.type === "date" && val) {
          val = DateTransformer.fromSheet(val);
        }
        plain[key] = val !== void 0 ? val : null;
      }
      let virtualsCount = 0;
      for (const key of Object.keys(descriptors)) {
        if (descriptors[key].get && key !== "constructor") {
          plain[key] = this[key];
          virtualsCount++;
        }
      }
      if (virtualsCount > 0) {
        this.logger.debug(`[FLOW-SERIALIZE] Mapeados ${virtualsCount} Virtual Getters en [${entityClass.name}].`);
      }
      const relations = Reflect.getOwnMetadata(SHEETS_RELATIONS_LIST, entityClass) || Reflect.getOwnMetadata(SHEETS_RELATIONS_LIST, entityClass.prototype) || [];
      for (const rel of relations) {
        if (this[rel] !== void 0) {
          plain[rel] = this[rel];
        }
      }
      return plain;
    }
    toSheetRow() {
      const plain = {};
      const details = Reflect.getMetadata(SHEETS_COLUMN_DETAILS, entityClass) || {};
      const metadataKeys = Object.keys(details);
      for (const key of metadataKeys) {
        const dbColumnName = MetadataRegistry.prototype.getDatabaseColumnName(entityClass, key);
        let val = this[key];
        if (details[key]?.type === "date" && val) {
          val = DateTransformer.toSheet(val);
        }
        plain[dbColumnName] = val !== void 0 ? val : null;
      }
      if (this.rowNumber !== void 0) plain.__row = this.rowNumber;
      return plain;
    }
    // ====================================================================
    // MÉTODOS DE INSTANCIA
    // ====================================================================
    async save() {
      const saved = await repo.save(this);
      Object.assign(this, saved);
      return this;
    }
    async remove() {
      await repo.delete(this);
    }
    getPrimaryKeyValue(key) {
      return this[key];
    }
    get rowNumber() {
      return this[ROW_INDEX_SYMBOL];
    }
    markAsSaved(rowNum) {
      this.__isNew = false;
      this[ROW_INDEX_SYMBOL] = rowNum;
      this.logger.debug(`[FLOW-WAL] Documento marcado como guardado en Sheets. Fila asignada: ${rowNum}`);
    }
    // ====================================================================
    // MÉTODOS ESTÁTICOS
    // ====================================================================
    static async save(data) {
      const instance = new DocumentModel2(data);
      return instance.save();
    }
    static async find(filter, options) {
      return repo.find(filter, options);
    }
    static async findOne(filter, options) {
      return repo.findOne(filter, options);
    }
    static async findOneAndUpdate(filter, update, options) {
      return repo.findOneAndUpdate(filter, update, options);
    }
    static aggregate() {
      return repo.createAggregation();
    }
  };
  Object.setPrototypeOf(DocumentModel.prototype, entityClass.prototype);
  repo.bindModel(DocumentModel);
  return DocumentModel;
}
__name(createModel, "createModel");

// src/core/outbox/outbox.processor.ts
var import_auth6 = require("@spreadsheet/auth");
function _ts_decorate20(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate20, "_ts_decorate");
function _ts_metadata13(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata13, "_ts_metadata");
function _ts_param9(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param9, "_ts_param");
var OutboxProcessor = class _OutboxProcessor {
  static {
    __name(this, "OutboxProcessor");
  }
  moduleRef;
  pg;
  options;
  metadataRegistry;
  cacheManager;
  logger = new import_common21.Logger(_OutboxProcessor.name);
  isRunning = false;
  isShuttingDown = false;
  timeoutId;
  constructor(moduleRef, pg, options, metadataRegistry, cacheManager) {
    this.moduleRef = moduleRef;
    this.pg = pg;
    this.options = options;
    this.metadataRegistry = metadataRegistry;
    this.cacheManager = cacheManager;
  }
  async onApplicationBootstrap() {
    this.logger.log("\u{1F680} [OUTBOX:BOOT] Inicializando Outbox Processor (Alta Concurrencia + Resiliencia).");
    await this.ensureDatabaseIndices();
    this.scheduleNextTick();
  }
  async ensureDatabaseIndices() {
    try {
      await this.pg.query(`
                CREATE INDEX IF NOT EXISTS idx_outbox_entries_polling 
                ON outbox_entries (status, next_attempt_at, started_at, created_at ASC);
            `);
      await this.pg.query(`
                CREATE INDEX IF NOT EXISTS idx_outbox_entries_purge 
                ON outbox_entries (status, finished_at);
            `);
      this.logger.log("\u26A1 [OUTBOX:INFRA] \xCDndices SQL de optimizaci\xF3n verificados exitosamente.");
    } catch (error) {
      this.logger.error(`\u274C [OUTBOX:INFRA] Error aprovisionando \xEDndices en Postgres: ${error.message}`);
    }
  }
  onApplicationShutdown() {
    this.logger.log("\u{1F6D1} [OUTBOX:SHUTDOWN] Deteniendo Outbox Processor de forma segura...");
    this.isShuttingDown = true;
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
  scheduleNextTick() {
    if (this.isShuttingDown) return;
    const interval = this.options.outboxPollingInterval || 1e4;
    this.timeoutId = setTimeout(() => this.processPendingOperations(), interval);
  }
  async processPendingOperations() {
    if (this.isRunning || this.isShuttingDown) return;
    this.isRunning = true;
    let pendingTasks = [];
    await this.pg.query("BEGIN");
    try {
      const result = await this.pg.query(`SELECT id, 
                        entity_name as "entityName", 
                        sheet_name as "sheetName", 
                        operation, 
                        payload, 
                        attempts 
                 FROM outbox_entries 
                 WHERE (status IN ($1, $2) AND (next_attempt_at IS NULL OR next_attempt_at <= CURRENT_TIMESTAMP))
                    OR (status = $3 AND started_at <= CURRENT_TIMESTAMP - INTERVAL '5 minutes') -- \u{1F9DF} RESCATE DE ZOMBIS
                 ORDER BY created_at ASC 
                 LIMIT 50
                 FOR UPDATE SKIP LOCKED`, [
        OutboxStatus.PENDING,
        OutboxStatus.FAILED,
        OutboxStatus.PROCESSING
      ]);
      pendingTasks = result.rows;
      if (pendingTasks.length > 0) {
        const taskIds = pendingTasks.map((t) => t.id);
        await this.pg.query(`UPDATE outbox_entries 
                     SET status = $1, started_at = CURRENT_TIMESTAMP, error = NULL 
                     WHERE id = ANY($2)`, [
          OutboxStatus.PROCESSING,
          taskIds
        ]);
        this.logger.debug(`\u{1F4E5} [OUTBOX:PULL] Reclamadas ${pendingTasks.length} tareas para sincronizaci\xF3n.`);
      }
      await this.pg.query("COMMIT");
    } catch (error) {
      await this.pg.query("ROLLBACK");
      this.logger.error(`\u274C [OUTBOX:PULL] Error cr\xEDtico en micro-transacci\xF3n de reclamo: ${error.message}`, error.stack);
      this.isRunning = false;
      this.scheduleNextTick();
      return;
    }
    if (pendingTasks.length === 0) {
      await this.purgeOldCompletedTasks();
      this.isRunning = false;
      this.scheduleNextTick();
      return;
    }
    try {
      const groupedTasks = pendingTasks.reduce((acc, task) => {
        (acc[task.entityName] = acc[task.entityName] || []).push(task);
        return acc;
      }, {});
      for (const [entityName, tasks] of Object.entries(groupedTasks)) {
        if (this.isShuttingDown) break;
        await this.processGroup(entityName, tasks);
      }
    } catch (error) {
      this.logger.error(`\u274C [OUTBOX:DISPATCH] Error inesperado distribuyendo lotes: ${error.message}`, error.stack);
    } finally {
      this.isRunning = false;
      this.scheduleNextTick();
    }
  }
  async processGroup(entityName, tasks) {
    const entityClass = this.metadataRegistry.getEntityByName(entityName);
    if (!entityClass) {
      this.logger.error(`\u274C [OUTBOX:METADATA] Entidad no registrada en el MetadataRegistry: [${entityName}].`);
      await this.markAs(tasks, OutboxStatus.FAILED, `Entidad no registrada: ${entityName}`);
      return;
    }
    const repoToken = getRepositoryToken(entityClass);
    let repo;
    try {
      repo = await this.moduleRef.resolve(repoToken, void 0, {
        strict: false
      });
    } catch (err) {
      this.logger.error(`\u274C [OUTBOX:RESOLVE] No se pudo resolver el repositorio para [${entityName}]: ${err.message}`);
      await this.markAs(tasks, OutboxStatus.FAILED, err.message);
      return;
    }
    const startTime = Date.now();
    this.logger.log(`\u2699\uFE0F [OUTBOX:SYNC] Iniciando sincronizaci\xF3n f\xEDsica hacia Google Sheets: ${tasks.length} registros de [${entityName}]...`);
    try {
      const Model = createModel(entityClass, repo);
      const sheetName = this.metadataRegistry.getSchema(entityClass).sheetName;
      const batchData = {
        inserts: [],
        updates: [],
        deletes: []
      };
      for (const task of tasks) {
        const rawData = task.payload;
        const doc = new Model(rawData);
        const rawRowValues = this.metadataRegistry.serialize(doc, entityClass);
        const rowIndex = rawData._row || doc.rowNumber;
        if (task.operation === "INSERT" || task.operation === "SAVE") {
          batchData.inserts.push(rawRowValues);
        } else if (task.operation === "UPDATE") {
          if (rowIndex && rowIndex !== -1) {
            batchData.updates.push({
              row: rowIndex,
              values: rawRowValues
            });
          }
        } else if (task.operation === "DELETE") {
          if (rowIndex && rowIndex !== -1) {
            batchData.deletes.push(rowIndex);
          }
        }
      }
      const dsm = repo.dataSource;
      const gasGateway = dsm.gasQueryGateway;
      if (!gasGateway) {
        throw new Error(`Infraestructura corrupta: gasQueryGateway no disponible en el DataSourceManager.`);
      }
      this.logger.debug(`\u{1F4E4} [OUTBOX:GAS-WRITE] Despachando batchCommit f\xEDsico a la pesta\xF1a [${sheetName}] | Inserts: ${batchData.inserts.length}, Updates: ${batchData.updates.length}, Deletes: ${batchData.deletes.length}`);
      await dsm.executeWithRetry(async () => {
        if (typeof gasGateway.batchCommit === "function") {
          return await gasGateway.batchCommit(sheetName, batchData);
        } else if (typeof gasGateway.execute === "function") {
          return await gasGateway.execute("batchCommit", sheetName, batchData);
        } else {
          throw new Error(`El GasQueryGateway inyectado no posee un m\xE9todo expuesto para procesar mutaciones batchCommit.`);
        }
      }, `GAS Physical Sync [${sheetName}]`);
      const duration = Date.now() - startTime;
      try {
        await this.cacheManager.del(CacheKeys.SHEET_DATA(entityName));
      } catch (cacheErr) {
        this.logger.warn(`\u26A0\uFE0F [OUTBOX:CACHE] La purga de cach\xE9 fall\xF3 para [${entityName}]: ${cacheErr.message}`);
      }
      await this.markAs(tasks, OutboxStatus.COMPLETED);
      this.logger.log(`\u2705 [OUTBOX:SUCCESS] Sincronizaci\xF3n finalizada con \xE9xito en Google Sheets en ${duration}ms.`);
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`\u{1F4A5} [OUTBOX:FAILED] Error cr\xEDtico enviando datos f\xEDsicos a Google Sheets: ${error.message}`, error.stack);
      for (const task of tasks) {
        await this.handleIndividualFailure(task, error.message);
      }
    }
  }
  async markAs(tasks, status, errorMsg = null) {
    const taskIds = tasks.map((t) => t.id);
    const finishedAt = status === OutboxStatus.COMPLETED ? /* @__PURE__ */ new Date() : null;
    await this.pg.query(`UPDATE outbox_entries 
             SET status = $1, finished_at = $2, error = $3, next_attempt_at = NULL 
             WHERE id = ANY($4)`, [
      status,
      finishedAt,
      errorMsg,
      taskIds
    ]);
  }
  async handleIndividualFailure(task, errorMessage) {
    const attempts = (task.attempts || 0) + 1;
    const maxAttempts = 5;
    if (attempts >= maxAttempts) {
      this.logger.warn(`\u2620\uFE0F [OUTBOX:DEAD-LETTER] Tarea [${task.id}] excedi\xF3 ${maxAttempts} intentos. Marcada como FAILED definitiva.`);
      await this.pg.query(`UPDATE outbox_entries 
                 SET status = $1, attempts = $2, error = $3, updated_at = CURRENT_TIMESTAMP, next_attempt_at = NULL 
                 WHERE id = $4`, [
        OutboxStatus.FAILED,
        attempts,
        errorMessage,
        task.id
      ]);
    } else {
      const secondsToWait = Math.pow(2, attempts) * 10;
      const nextAttemptAt = new Date(Date.now() + secondsToWait * 1e3);
      this.logger.debug(`\u{1F504} [OUTBOX:RETRY] Tarea [${task.id}] reprogramada para reintento #${attempts} en ${secondsToWait}s.`);
      await this.pg.query(`UPDATE outbox_entries 
                 SET status = $1, attempts = $2, error = $3, updated_at = CURRENT_TIMESTAMP, next_attempt_at = $4 
                 WHERE id = $5`, [
        OutboxStatus.PENDING,
        attempts,
        errorMessage,
        nextAttemptAt,
        task.id
      ]);
    }
  }
  async purgeOldCompletedTasks() {
    try {
      const retentionInterval = this.options.outboxRetentionInterval || "2 hours";
      const result = await this.pg.query(`DELETE FROM outbox_entries 
                 WHERE status = $1 
                   AND finished_at < CURRENT_TIMESTAMP - ($2::INTERVAL)`, [
        OutboxStatus.COMPLETED,
        retentionInterval
      ]);
      if (result.rowCount && result.rowCount > 0) {
        this.logger.log(`\u{1F9F9} [OUTBOX:PURGE] Mantenimiento: ${result.rowCount} registros completados eliminados (Retenci\xF3n: ${retentionInterval}).`);
      }
    } catch (error) {
      this.logger.error(`\u274C [OUTBOX:PURGE] Error en limpieza autom\xE1tica de la Outbox: ${error.message}`);
    }
  }
  onModuleDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.logger.log("--- \u2705 [OUTBOX:STOP] OutboxProcessor detenido de manera limpia ---");
    }
  }
};
OutboxProcessor = _ts_decorate20([
  (0, import_common21.Injectable)(),
  _ts_param9(1, (0, import_common21.Inject)(POSTGRES_TOKEN)),
  _ts_param9(2, (0, import_common21.Inject)(import_auth6.SHEET_ODM_OPTIONS)),
  _ts_param9(4, (0, import_common21.Inject)(import_cache_manager.CACHE_MANAGER)),
  _ts_metadata13("design:type", Function),
  _ts_metadata13("design:paramtypes", [
    typeof import_core.ModuleRef === "undefined" ? Object : import_core.ModuleRef,
    typeof IPostgresProvider === "undefined" ? Object : IPostgresProvider,
    typeof SheetOdmModuleOptions === "undefined" ? Object : SheetOdmModuleOptions,
    typeof MetadataRegistry === "undefined" ? Object : MetadataRegistry,
    typeof Cache === "undefined" ? Object : Cache
  ])
], OutboxProcessor);

// src/core/outbox/outbox.module.ts
var import_auth7 = require("@spreadsheet/auth");
function _ts_decorate21(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate21, "_ts_decorate");
var OutboxModule = class _OutboxModule {
  static {
    __name(this, "OutboxModule");
  }
  static register(options) {
    return {
      module: _OutboxModule,
      providers: [
        OutboxProcessor,
        {
          provide: OutboxService,
          useClass: PostgresOutboxService
        },
        {
          provide: import_auth7.SHEET_ODM_OPTIONS,
          useValue: options
        }
      ],
      //imports: [InfrastructureModule],
      exports: [
        OutboxService,
        OutboxProcessor
      ]
    };
  }
  static registerAsync(options) {
    return {
      module: _OutboxModule,
      imports: options.imports || [],
      providers: [
        {
          provide: import_auth7.SHEET_ODM_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || []
        },
        OutboxProcessor,
        {
          provide: OutboxService,
          useClass: PostgresOutboxService
        }
      ],
      exports: [
        OutboxService,
        OutboxProcessor
      ]
    };
  }
};
OutboxModule = _ts_decorate21([
  (0, import_common22.Module)({})
], OutboxModule);

// src/core/uow/uow.module.ts
var import_common24 = require("@nestjs/common");

// src/core/uow/services/unit-of-work.service.ts
var import_common23 = require("@nestjs/common");
function _ts_decorate22(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate22, "_ts_decorate");
function _ts_metadata14(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata14, "_ts_metadata");
var UnitOfWork = class _UnitOfWork {
  static {
    __name(this, "UnitOfWork");
  }
  outboxService;
  logger = new import_common23.Logger(_UnitOfWork.name);
  identityMap = /* @__PURE__ */ new Map();
  pendingOperations = [];
  isTransactional = false;
  // 🔥 Inyectamos el OutboxService (y removemos ModuleRef si ya no resolvemos repositorios aquí)
  constructor(outboxService) {
    this.outboxService = outboxService;
  }
  getCompositeKey(entityClass, pk) {
    return `${entityClass.name}:${pk}`;
  }
  register(doc, pk, entityClass) {
    const key = this.getCompositeKey(entityClass, pk);
    if (!this.identityMap.has(key)) {
      this.identityMap.set(key, doc);
    }
  }
  get(pk, entityClass) {
    return this.identityMap.get(this.getCompositeKey(entityClass, pk));
  }
  getAll() {
    return Array.from(this.identityMap.values());
  }
  startTransaction() {
    this.isTransactional = true;
    this.pendingOperations = [];
    this.logger.debug("[UOW] \u{1F3C1} Transacci\xF3n iniciada en contexto de Request.");
  }
  queueOperation(operation) {
    if (!this.isTransactional) {
      return false;
    }
    this.pendingOperations.push(operation);
    this.logger.debug(`[UOW] \u{1F4E5} Encolada operaci\xF3n ${operation.type} para [${operation.sheetName}]`);
    return true;
  }
  hasActiveTransaction() {
    return this.isTransactional;
  }
  getPendingOperations() {
    return this.pendingOperations;
  }
  /**
   * 🔥 COMMIT REFACTORIZADO (Patrón Outbox)
   * Serializa las operaciones y delega la persistencia atómica a la base de datos local.
   */
  async commit() {
    if (!this.isTransactional) {
      this.logger.warn("[UOW] \u26A0\uFE0F Intentando hacer commit sin una transacci\xF3n activa.");
      return;
    }
    if (this.pendingOperations.length === 0) {
      this.logger.debug("[UOW] \u{1F4A4} No hay operaciones pendientes en la cola. Commit omitido.");
      this.isTransactional = false;
      return;
    }
    this.logger.log(`[UOW] \u{1F680} Asegurando ${this.pendingOperations.length} operaciones en la Outbox local...`);
    try {
      const outboxEntries = this.pendingOperations.map((op) => {
        const now = /* @__PURE__ */ new Date();
        return {
          id: IdFactory.createUUID(),
          entityName: op.entityClass.name,
          sheetName: op.sheetName,
          operation: op.type,
          doc: op.doc,
          payload: op.doc,
          status: OutboxStatus.PENDING,
          attempts: 0,
          createdAt: now,
          updatedAt: now
          // Requerido por tu interfaz
        };
      });
      await this.outboxService.saveTransaction(outboxEntries);
      this.logger.log("\u{1F389} [UOW] \xA1Transacci\xF3n asegurada en la Outbox con \xE9xito!");
      this.pendingOperations = [];
      this.isTransactional = false;
    } catch (error) {
      this.logger.error(`\u274C [UOW Commit Error] Fall\xF3 la escritura en Outbox: ${error.message}`);
      this.rollback();
      throw error;
    }
  }
  rollback() {
    this.pendingOperations = [];
    this.isTransactional = false;
    this.logger.warn("[UOW] \u{1F504} Transacci\xF3n abortada. Cola de operaciones limpiada.");
  }
  clear() {
    this.identityMap.clear();
    this.pendingOperations = [];
    this.isTransactional = false;
  }
  clearByEntity(entityClass) {
    const prefix = `${entityClass.name}:`;
    for (const key of this.identityMap.keys()) {
      if (key.startsWith(prefix)) this.identityMap.delete(key);
    }
  }
};
UnitOfWork = _ts_decorate22([
  (0, import_common23.Injectable)({
    scope: import_common23.Scope.REQUEST
  }),
  _ts_metadata14("design:type", Function),
  _ts_metadata14("design:paramtypes", [
    typeof OutboxService === "undefined" ? Object : OutboxService
  ])
], UnitOfWork);

// src/core/uow/uow.module.ts
function _ts_decorate23(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate23, "_ts_decorate");
var UowModule = class {
  static {
    __name(this, "UowModule");
  }
};
UowModule = _ts_decorate23([
  (0, import_common24.Module)({
    // Importamos el OutboxModule porque UoW necesita usar el PostgresOutboxService
    imports: [
      OutboxModule
    ],
    providers: [
      UnitOfWork
    ],
    // Exportamos UnitOfWork para que los Repositorios y Servicios de la app puedan inyectarlo
    exports: [
      UnitOfWork
    ]
  })
], UowModule);

// src/core/diagnostic/odm-diagnostics.service.ts
var import_common25 = require("@nestjs/common");
function _ts_decorate24(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate24, "_ts_decorate");
function _ts_metadata15(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata15, "_ts_metadata");
function _ts_param10(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param10, "_ts_param");
var OdmDiagnosticsService = class {
  static {
    __name(this, "OdmDiagnosticsService");
  }
  pg;
  constructor(pg) {
    this.pg = pg;
  }
  async getSystemHealth() {
    const outboxStats = await this.pg.query(`
            SELECT status, COUNT(*) as count 
            FROM outbox_entries 
            GROUP BY status
        `);
    const writeLatency = await this.pg.query(`
            SELECT COALESCE(AVG(EXTRACT(EPOCH FROM (finished_at - started_at)) * 1000), 0) as avg_latency
            FROM outbox_entries
            WHERE status = 'COMPLETED' AND started_at IS NOT NULL AND finished_at IS NOT NULL
        `);
    const readStats = await this.pg.query(`
            SELECT 
                COUNT(*) as total_reads,
                COUNT(*) FILTER (WHERE success = FALSE) as failed_reads,
                COALESCE(AVG(latency_ms), 0) as avg_latency
            FROM read_logs
        `);
    const writeQueue = {
      PENDING: 0,
      PROCESSING: 0,
      COMPLETED: 0,
      FAILED: 0
    };
    outboxStats.rows.forEach((row) => {
      if (row.status in writeQueue) {
        writeQueue[row.status] = parseInt(row.count, 10);
      }
    });
    const totalWrites = writeQueue.COMPLETED + writeQueue.FAILED;
    const writeSuccessRate = totalWrites > 0 ? writeQueue.COMPLETED / totalWrites * 100 : 100;
    return {
      status: writeQueue.FAILED > 0 || parseInt(readStats.rows[0].failed_reads || "0") > 0 ? "DEGRADED" : "HEALTHY",
      timestamp: /* @__PURE__ */ new Date(),
      metrics: {
        writes: {
          queue: writeQueue,
          successRate: `${writeSuccessRate.toFixed(2)}%`,
          avgLatencyMs: Math.round(writeLatency.rows[0]?.avg_latency || 0)
        },
        reads: {
          total: parseInt(readStats.rows[0].total_reads || "0", 10),
          failed: parseInt(readStats.rows[0].failed_reads || "0", 10),
          avgLatencyMs: Math.round(readStats.rows[0].avg_latency || 0)
        }
      }
    };
  }
  async getRecentErrors(limit = 10) {
    const query = await this.pg.query(`
            SELECT 'WRITE' as type, id, entity_name as entity, operation, error, updated_at as timestamp
            FROM outbox_entries
            WHERE status = 'FAILED' OR error IS NOT NULL
            UNION ALL
            SELECT 'READ' as type, id, sheet_name as entity, operation, error, created_at as timestamp
            FROM read_logs
            WHERE success = FALSE
            ORDER BY timestamp DESC
            LIMIT $1
        `, [
      limit
    ]);
    return query.rows;
  }
  async getPendingQueue() {
    const query = await this.pg.query(`
            SELECT id, entity_name, operation, sheet_name, attempts, created_at
            FROM outbox_entries
            WHERE status IN ('PENDING', 'PROCESSING')
            ORDER BY created_at ASC
        `);
    return query.rows;
  }
};
OdmDiagnosticsService = _ts_decorate24([
  (0, import_common25.Injectable)(),
  _ts_param10(0, (0, import_common25.Inject)(POSTGRES_TOKEN)),
  _ts_metadata15("design:type", Function),
  _ts_metadata15("design:paramtypes", [
    typeof IPostgresProvider === "undefined" ? Object : IPostgresProvider
  ])
], OdmDiagnosticsService);

// src/core/diagnostic/odm-diagnostics.controller.ts
var import_common26 = require("@nestjs/common");
function _ts_decorate25(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate25, "_ts_decorate");
function _ts_metadata16(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata16, "_ts_metadata");
function _ts_param11(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param11, "_ts_param");
var OdmDiagnosticsController = class {
  static {
    __name(this, "OdmDiagnosticsController");
  }
  diagnostics;
  constructor(diagnostics) {
    this.diagnostics = diagnostics;
  }
  /**
   * Obtiene el estado de salud global (lecturas + escrituras)
   */
  async getHealth() {
    return this.diagnostics.getSystemHealth();
  }
  /**
   * Obtiene solo las operaciones de escritura pendientes
   */
  async getQueue() {
    return this.diagnostics.getPendingQueue();
  }
  /**
   * Obtiene los últimos errores ocurridos en cualquier operación
   */
  async getErrors(limit) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.diagnostics.getRecentErrors(parsedLimit);
  }
};
_ts_decorate25([
  (0, import_common26.Get)("health"),
  _ts_metadata16("design:type", Function),
  _ts_metadata16("design:paramtypes", []),
  _ts_metadata16("design:returntype", Promise)
], OdmDiagnosticsController.prototype, "getHealth", null);
_ts_decorate25([
  (0, import_common26.Get)("queue"),
  _ts_metadata16("design:type", Function),
  _ts_metadata16("design:paramtypes", []),
  _ts_metadata16("design:returntype", Promise)
], OdmDiagnosticsController.prototype, "getQueue", null);
_ts_decorate25([
  (0, import_common26.Get)("errors"),
  _ts_param11(0, (0, import_common26.Query)("limit")),
  _ts_metadata16("design:type", Function),
  _ts_metadata16("design:paramtypes", [
    String
  ]),
  _ts_metadata16("design:returntype", Promise)
], OdmDiagnosticsController.prototype, "getErrors", null);
OdmDiagnosticsController = _ts_decorate25([
  (0, import_common26.Controller)("api/odm/diagnostics"),
  _ts_metadata16("design:type", Function),
  _ts_metadata16("design:paramtypes", [
    typeof OdmDiagnosticsService === "undefined" ? Object : OdmDiagnosticsService
  ])
], OdmDiagnosticsController);

// src/core/repository/sheets-repository.factory.ts
var import_common34 = require("@nestjs/common");
var import_core2 = require("@nestjs/core");

// src/core/repository/sheets.repository.ts
var import_common27 = require("@nestjs/common");
var SheetsRepository = class {
  static {
    __name(this, "SheetsRepository");
  }
  entityClass;
  logger;
  sheetName;
  metadata;
  dataSource;
  uow;
  queryEngine;
  mutationEngine;
  populateEngine;
  cacheManager;
  aggregationFactory;
  // 🚀 NUEVO: Propiedad privada para el motor de Joins de pestañas
  joinSheetTabsService;
  documentModelConstructor;
  constructor(entityClass, core) {
    this.entityClass = entityClass;
    this.logger = new import_common27.Logger(`Repository<${this.entityClass.name}>`);
    this.metadata = core.metadata;
    this.dataSource = core.dataSource;
    this.uow = core.uow;
    this.queryEngine = core.queryEngine;
    this.mutationEngine = core.mutationEngine;
    this.populateEngine = core.populateEngine;
    this.cacheManager = core.cacheManager;
    this.aggregationFactory = core.aggregationFactory;
    this.joinSheetTabsService = core.joinSheetTabsService;
    this.sheetName = this.metadata.getSchema(this.entityClass).sheetName;
  }
  // ✨ 2. Método para vincular el modelo enriquecido al repositorio
  bindModel(modelConstructor) {
    this.documentModelConstructor = modelConstructor;
  }
  // ✨ 3. Helper para obtener el constructor correcto (Prioridad: Custom > DocumentModel > Entity pura)
  getDocumentConstructor(options) {
    return options?.customConstructor || this.documentModelConstructor || this.entityClass;
  }
  getCacheKey() {
    return CacheKeys.SHEET_DATA(this.sheetName);
  }
  /**
   * 🔍 BÚSQUEDA ÚNICA
   */
  async findOne(filter, options) {
    const cachedItems = await this.cacheManager.get(this.getCacheKey());
    if (cachedItems && cachedItems.length > 0 && filter) {
      const propertyName = Object.keys(filter)[0];
      const searchValue = String(filter[propertyName]);
      const schema = this.metadata.getSchema(this.entityClass);
      const colConfig = schema.columns[propertyName];
      const rawColName = colConfig?.name || propertyName;
      const foundRaw = cachedItems.find((item) => String(item[rawColName] ?? item[propertyName]) === searchValue);
      if (foundRaw) {
        this.logger.debug(`[Cache Hit] findOne resuelto desde RAM para [${this.sheetName}]`);
        const instance = this.hydrateAndCacheRawResult(foundRaw, options);
        await this.applyRelations([
          instance
        ], options);
        return instance;
      }
    }
    if (this.canUseIndexedRead(filter, options)) {
      const propertyName = Object.keys(filter)[0];
      const searchValue = String(filter[propertyName]);
      const schema = this.metadata.getSchema(this.entityClass);
      const colConfig = schema.columns[propertyName];
      const columnName = (colConfig?.name || propertyName).toUpperCase();
      try {
        const rawData = await this.dataSource.executeWithRetry(() => this.dataSource.readFindOne(this.sheetName, columnName, searchValue), `Indexed FindOne [${this.sheetName}]`);
        if (rawData) {
          const instance = this.hydrateAndCacheRawResult(rawData, options);
          await this.applyRelations([
            instance
          ], options);
          return instance;
        }
      } catch (error) {
        this.logger.warn(`[Fallback] Lectura indexada fall\xF3 en findOne (${error.message}).`);
      }
    }
    const results = await this.find(filter, {
      ...options,
      limit: 1
    });
    return results.length > 0 ? results[0] : null;
  }
  /**
   * 🔍 BÚSQUEDA MÚLTIPLE
   */
  async find(filter, options) {
    const safeFilter = filter || {};
    this.logger.debug(`[FIND] Iniciando b\xFAsqueda en [${this.sheetName}]. Filtro: ${JSON.stringify(safeFilter)}`);
    let instances = [];
    if (this.canUseIndexedRead(safeFilter, options)) {
      const propertyName = Object.keys(safeFilter)[0];
      const searchValue = String(safeFilter[propertyName]);
      const schema = this.metadata.getSchema(this.entityClass);
      const colConfig = schema.columns[propertyName];
      const columnName = (colConfig?.name || propertyName).toUpperCase();
      try {
        const rawArray = await this.dataSource.executeWithRetry(() => this.dataSource.readFindMany(this.sheetName, columnName, searchValue), `Indexed FindMany [${this.sheetName}]`);
        if (rawArray && rawArray.length > 0) {
          this.logger.debug(`[FIND] Sheets retorn\xF3 ${rawArray.length} filas crudas (Indexadas).`);
          const mappedInstances = rawArray.map((raw) => this.hydrateAndCacheRawResult(raw, options));
          instances = await this.queryEngine.execute(mappedInstances, safeFilter, options);
        }
      } catch (error) {
        this.logger.warn(`[Fallback] Lectura indexada masiva fall\xF3. Pasando a escaneo total...`);
      }
    }
    if (instances.length === 0) {
      const rawItems = await this.fetchRawData(options?.includeInactive);
      if (rawItems.length > 0) {
        this.logger.debug(`[FIND] Sheets retorn\xF3 ${rawItems.length} filas crudas (Escaneo).`);
      }
      const mappedInstances = rawItems.map((raw) => this.hydrateAndCacheRawResult(raw, options));
      instances = await this.queryEngine.execute(mappedInstances, safeFilter, options);
    }
    await this.applyRelations(instances, options);
    if (instances.length > 0 && this.sheetName === "obreros") {
      const muestra = instances[0];
      this.logger.debug(`[RELATIONS] Primer obrero procesado: ID=${muestra.id}`);
    }
    return instances;
  }
  /**
   * 🔄 BUSCAR Y ACTUALIZAR
   */
  async findOneAndUpdate(filter, update, options = {}) {
    const found = await this.findOne(filter, {
      includeInactive: options.includeInactive,
      customConstructor: options.customConstructor
    });
    if (!found) {
      if (options.upsert) {
        const initialData = this.mutationEngine.mutate(update, filter);
        const newDoc = this.create(initialData);
        return await newDoc.save();
      }
      return null;
    }
    const originalPlainData = {
      ...found.toJSON()
    };
    const mutatedData = this.mutationEngine.mutate(update, found.toJSON());
    Object.assign(found, mutatedData);
    const savedDoc = await found.save();
    if (options.new === false) {
      const Constructor = this.getDocumentConstructor(options);
      const oldDoc = new Constructor(originalPlainData, this, false);
      return oldDoc;
    }
    return savedDoc;
  }
  /**
   * 📊 AGREGACIÓN
   */
  async aggregate(pipeline) {
    try {
      const rawItems = await this.fetchRawData(false);
      return await this.queryEngine.aggregate(rawItems, pipeline);
    } catch (error) {
      this.logger.error(`\u274C Error en aggregate() en "${this.sheetName}": ${error.message}`);
      throw error;
    }
  }
  /**
   * 🚀 NUEVO / REFACORIZADO: Centralizador de resoluciones relacionales de lectura
   */
  async applyRelations(instances, options) {
    if (!instances || instances.length === 0) return;
    if (options?.populate) {
      await this.populateEngine.populate(instances, this.entityClass, options.populate);
    }
    if (this.joinSheetTabsService && typeof this.joinSheetTabsService.resolveJoins === "function") {
      await this.joinSheetTabsService.resolveJoins(instances, this.entityClass, options);
    }
  }
  /**
   * 📝 GUARDAR (UoW o Directo)
   */
  async save(doc) {
    if (!doc || typeof doc.getPrimaryKeyValue !== "function") {
      throw new Error(`[OdmError] Estructura inv\xE1lida. El objeto no hereda de SheetDocument.`);
    }
    const pkField = this.getPrimaryKeyField();
    const pk = doc.getPrimaryKeyValue(pkField);
    const rowIndex = doc.rowNumber;
    const isNew = rowIndex === void 0;
    const operation = isNew ? TypeOp.INSERT : TypeOp.UPDATE;
    const rawPayload = doc.toJSON();
    const payload = {
      ...rawPayload
    };
    if (rowIndex !== void 0) {
      payload._row = rowIndex;
    }
    const childMutations = [];
    const relations = this.metadata.getCompiledRelations(this.entityClass);
    for (const rel of relations) {
      if (rel.type === "subcollection" && payload[rel.propertyName]) {
        const childrenArray = payload[rel.propertyName];
        if (Array.isArray(childrenArray)) {
          const TargetEntityClass = rel.targetEntity();
          const joinColName = rel.joinColumn || `${this.entityClass.name.toLowerCase()}Id`;
          for (const child of childrenArray) {
            child[joinColName] = pk;
            childMutations.push({
              entityClass: TargetEntityClass,
              payload: child,
              operation: child._row === void 0 ? TypeOp.INSERT : TypeOp.UPDATE
            });
          }
        }
        delete payload[rel.propertyName];
      }
    }
    if (this.uow.hasActiveTransaction()) {
      this.uow.queueOperation({
        type: operation,
        entityClass: this.entityClass,
        sheetName: this.sheetName,
        doc: payload,
        pk
      });
      for (const childMut of childMutations) {
        const childSchema = this.metadata.getSchema(childMut.entityClass);
        const childPkField = this.metadata.getPrimaryKeyField(childMut.entityClass);
        this.uow.queueOperation({
          type: childMut.operation,
          entityClass: childMut.entityClass,
          sheetName: childSchema.sheetName,
          doc: childMut.payload,
          pk: childMut.payload[childPkField]
        });
      }
      this.uow.register(doc, pk, this.entityClass);
      return doc;
    }
    await this.dataSource.dispatchMutation(this.entityClass, operation, payload, payload);
    for (const childMut of childMutations) {
      await this.dataSource.dispatchMutation(childMut.entityClass, childMut.operation, childMut.payload, childMut.payload);
    }
    await this.syncOptimisticCache(doc, operation, childMutations);
    return doc;
  }
  /**
   * 🗑️ ELIMINAR (Con soporte opcional para Cascading Deletes del nuevo módulo)
   */
  async delete(doc) {
    const pk = doc.getPrimaryKeyValue(this.getPrimaryKeyField());
    if (this.joinSheetTabsService && typeof this.joinSheetTabsService.handleCascadeDelete === "function") {
      await this.joinSheetTabsService.handleCascadeDelete(doc, this.entityClass);
    }
    if (this.uow.hasActiveTransaction()) {
      this.uow.queueOperation({
        type: TypeOp.DELETE,
        entityClass: this.entityClass,
        sheetName: this.sheetName,
        doc: doc.toJSON(),
        pk
      });
      return true;
    }
    await this.dataSource.dispatchMutation(this.entityClass, TypeOp.DELETE, doc.toJSON(), doc.toJSON());
    await this.syncOptimisticCache(doc, TypeOp.DELETE);
    return true;
  }
  /**
   * 🆕 CREAR INSTANCIA
   */
  create(data) {
    const generatedId = data.id || IdFactory.createShort();
    const payload = {
      ...data,
      id: generatedId
    };
    const Constructor = this.getDocumentConstructor();
    const instance = new Constructor(payload, this, true);
    EntityStore.set(instance, payload);
    return instance;
  }
  // ====================================================================
  // HELPERS INTERNOS
  // ====================================================================
  hydrateAndCacheRawResult(rawObject, options) {
    if (!rawObject) return null;
    const targetRaw = {
      ...rawObject
    };
    if (targetRaw._row !== void 0 && targetRaw._row !== null) {
      targetRaw[ROW_INDEX_SYMBOL] = targetRaw._row;
      delete targetRaw._row;
    }
    const cleanData = this.metadata.mapRawToEntity(targetRaw, this.entityClass);
    const pkField = this.getPrimaryKeyField();
    const pkValue = cleanData[pkField];
    const Constructor = this.getDocumentConstructor(options);
    const doc = new Constructor(cleanData, this, false);
    Object.assign(doc, cleanData);
    const relations = this.metadata.getCompiledRelations(this.entityClass);
    for (const rel of relations) {
      if (rel.isMany) {
        doc[rel.propertyName] = [];
      }
    }
    if (pkValue) {
      this.uow.register(doc, pkValue, this.entityClass);
    }
    return doc;
  }
  async clearRepositoryCache() {
    await this.cacheManager.del(this.getCacheKey());
    this.logger.debug(`[Cache Purged] Memoria invalidada para la pesta\xF1a: ${this.sheetName}`);
  }
  async fetchRawData(includeInactive = false) {
    const cacheKey = this.getCacheKey();
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      this.logger.debug(`[Cache Hit] Datos obtenidos de memoria para: ${this.sheetName}`);
      return cachedData;
    }
    this.logger.debug(`[Cache Miss] Solicitando filas crudas al DSM para: ${this.sheetName}`);
    let items = await this.dataSource.readFindAll(this.sheetName);
    if (!items) {
      items = [];
    }
    const schema = this.metadata.getSchema(this.entityClass);
    const deleteControlProp = schema.deleteControl;
    if (deleteControlProp && !includeInactive && items.length > 0) {
      items = items.filter((item) => !item[deleteControlProp]);
    }
    await this.cacheManager.set(cacheKey, items);
    return items;
  }
  /**
   * 📝 ESCRITURA Y PURGA DE CACHÉ
   */
  async commitBulk(documents) {
    if (!documents || documents.length === 0) return;
    const inserts = documents.filter((doc) => !doc[ROW_INDEX_SYMBOL]);
    const updates = documents.filter((doc) => doc[ROW_INDEX_SYMBOL] && !doc.deleted);
    const deletes = documents.filter((doc) => doc[ROW_INDEX_SYMBOL] && doc.deleted);
    try {
      if (deletes.length > 0) await this.processDeletes(deletes);
      if (updates.length > 0) await this.processUpdates(updates);
      if (inserts.length > 0) await this.processInserts(inserts);
      await this.cacheManager.del(this.getCacheKey());
      this.logger.debug(`[commitBulk] Lote procesado e invalidada cach\xE9 para: ${this.sheetName}`);
    } catch (error) {
      this.logger.error(`[commitBulk] Error: ${error.message}`);
      throw error;
    }
  }
  canUseIndexedRead(filter, options) {
    if (!filter || Object.keys(filter).length !== 1) return false;
    if (options?.sort) return false;
    const value = Object.values(filter)[0];
    return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
  }
  getPrimaryKeyField() {
    return this.metadata.getPrimaryKeyField(this.entityClass);
  }
  async processInserts(docs) {
    if (!docs || docs.length === 0) return;
    await Promise.all(docs.map(async (doc) => {
      const payload = doc.toJSON();
      const rawRowValues = this.metadata.serialize(doc, this.entityClass);
      await this.dataSource.dispatchMutation(this.entityClass, "INSERT", payload, rawRowValues);
      doc.markAsSaved(-1);
    }));
  }
  async processUpdates(docs) {
    if (!docs || docs.length === 0) return;
    await Promise.all(docs.map(async (doc) => {
      if (doc.version !== void 0 && typeof doc.setVersion === "function") {
        doc.setVersion(doc.version + 1);
      }
      const payload = doc.toJSON();
      const rawRowValues = this.metadata.serialize(doc, this.entityClass);
      const rowIndex = doc[ROW_INDEX_SYMBOL];
      const outboxRawDoc = {
        rowIndex,
        values: rawRowValues
      };
      await this.dataSource.dispatchMutation(this.entityClass, "UPDATE", payload, outboxRawDoc);
    }));
  }
  async processDeletes(docs) {
    if (!docs || docs.length === 0) return;
    const deleteControlProp = this.metadata.getDeleteControlProperty(this.entityClass);
    await Promise.all(docs.map(async (doc) => {
      const rowIndex = doc[ROW_INDEX_SYMBOL];
      if (deleteControlProp) {
        doc[deleteControlProp] = true;
        if (doc.version !== void 0 && typeof doc.setVersion === "function") {
          doc.setVersion(doc.version + 1);
        }
        const payload = doc.toJSON();
        const rawRowValues = this.metadata.serialize(doc, this.entityClass);
        await this.dataSource.dispatchMutation(this.entityClass, "UPDATE", payload, {
          rowIndex,
          values: rawRowValues
        });
      } else {
        const payload = doc.toJSON();
        await this.dataSource.dispatchMutation(this.entityClass, "DELETE", payload, {
          rowIndex
        });
      }
    }));
  }
  createAggregation() {
    return this.aggregationFactory.create();
  }
  async syncOptimisticCache(doc, op, childMutations = []) {
    const pkField = this.getPrimaryKeyField();
    const pkValue = doc.getPrimaryKeyValue(pkField);
    await this.syncEntityCache(this.entityClass, doc.toJSON(), op, pkValue);
    for (const child of childMutations) {
      const childPkField = this.metadata.getPrimaryKeyField(child.entityClass);
      const childPkValue = child.payload[childPkField];
      await this.syncEntityCache(child.entityClass, child.payload, child.operation, childPkValue);
    }
  }
  async syncEntityCache(entityClass, payload, op, pkValue) {
    const schema = this.metadata.getSchema(entityClass);
    const cacheKey = CacheKeys.SHEET_DATA(schema.sheetName);
    const cachedItems = await this.cacheManager.get(cacheKey) || [];
    const pkField = this.metadata.getPrimaryKeyField(entityClass);
    if (op === TypeOp.INSERT) {
      cachedItems.push(payload);
    } else if (op === TypeOp.UPDATE) {
      const index = cachedItems.findIndex((item) => {
        const itemPk = item[pkField] ?? item.id ?? item.ID;
        return String(itemPk) === String(pkValue) || payload._row && item._row === payload._row;
      });
      if (index !== -1) {
        cachedItems[index] = {
          ...cachedItems[index],
          ...payload
        };
      } else {
        cachedItems.push(payload);
      }
    } else if (op === TypeOp.DELETE) {
      const deleteControlProp = schema.deleteControl;
      const index = cachedItems.findIndex((item) => {
        const itemPk = item[pkField] ?? item.id ?? item.ID;
        return String(itemPk) === String(pkValue) || payload._row && item._row === payload._row;
      });
      if (index !== -1) {
        if (deleteControlProp) {
          cachedItems[index][deleteControlProp] = true;
        } else {
          cachedItems.splice(index, 1);
        }
      }
    }
    await this.cacheManager.set(cacheKey, cachedItems);
    this.logger.debug(`[Cache Sync] RAM actualizada para [${schema.sheetName}] (Op: ${op}) PK: ${pkValue}`);
  }
};

// src/core/repository/repository-core.facade.ts
var import_common33 = require("@nestjs/common");
var import_cache_manager2 = require("@nestjs/cache-manager");

// src/stages/aggregation.builder.ts
var import_common29 = require("@nestjs/common");

// src/stages/pipeline.registry.ts
var import_common28 = require("@nestjs/common");
function _ts_decorate26(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate26, "_ts_decorate");
function _ts_metadata17(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata17, "_ts_metadata");
function _ts_param12(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param12, "_ts_param");
var PipelineOrchestrator = class _PipelineOrchestrator {
  static {
    __name(this, "PipelineOrchestrator");
  }
  stages;
  logger = new import_common28.Logger(_PipelineOrchestrator.name);
  stagesMap = /* @__PURE__ */ new Map();
  constructor(stages) {
    this.stages = stages;
    if (!Array.isArray(this.stages)) {
      this.logger.error("ERROR CR\xCDTICO: PIPELINE_STAGE no est\xE1 bien inyectado. Aseg\xFArate de configurar el multi-provider.");
      return;
    }
    this.stages.forEach((stage) => {
      const className = stage.constructor.name;
      const stageName = className.replace("Stage", "");
      const operator = `$${stageName.charAt(0).toLowerCase()}${stageName.slice(1)}`;
      this.stagesMap.set(operator, stage);
      this.logger.log(`[PipelineOrchestrator] Stage registrado: ${operator} -> ${className}`);
    });
  }
  async executePipeline(data, pipeline) {
    let result = [
      ...data
    ];
    for (const stageConfig of pipeline) {
      if (!stageConfig || typeof stageConfig !== "object") continue;
      const operator = Object.keys(stageConfig)[0];
      const config = stageConfig[operator];
      const stage = this.stagesMap.get(operator);
      if (!stage) {
        this.logger.warn(`Stage no soportado u olvidado en la inyecci\xF3n del m\xF3dulo: ${operator}`);
        continue;
      }
      try {
        stage.validate(config);
        result = await stage.execute(result, config);
      } catch (error) {
        this.logger.error(`Error cr\xEDtico en la ejecuci\xF3n del stage ${operator}: ${error.message}`);
        throw error;
      }
    }
    return result;
  }
};
PipelineOrchestrator = _ts_decorate26([
  (0, import_common28.Injectable)(),
  _ts_param12(0, (0, import_common28.Inject)(PIPELINE_STAGE)),
  _ts_metadata17("design:type", Function),
  _ts_metadata17("design:paramtypes", [
    Array
  ])
], PipelineOrchestrator);

// src/stages/aggregation.builder.ts
function _ts_decorate27(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate27, "_ts_decorate");
function _ts_metadata18(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata18, "_ts_metadata");
var AggregationBuilder = class {
  static {
    __name(this, "AggregationBuilder");
  }
  pipelineOrchestrator;
  pipeline = [];
  constructor(pipelineOrchestrator) {
    this.pipelineOrchestrator = pipelineOrchestrator;
  }
  match(criteria) {
    StageUtils.validateObject(criteria, "$match");
    this.pipeline.push({
      $match: criteria
    });
    return this;
  }
  lookup(config) {
    StageUtils.validateObject(config, "$lookup");
    this.pipeline.push({
      $lookup: config
    });
    return this;
  }
  project(criteria) {
    StageUtils.validateObject(criteria, "$project");
    this.pipeline.push({
      $project: criteria
    });
    return this;
  }
  sort(criteria) {
    StageUtils.validateObject(criteria, "$sort");
    this.pipeline.push({
      $sort: criteria
    });
    return this;
  }
  group(criteria) {
    const fullCriteria = {
      _id: null,
      ...criteria
    };
    this.pipeline.push({
      $group: fullCriteria
    });
    return this;
  }
  unwind(criteria) {
    if (typeof criteria === "string") {
      criteria = {
        path: criteria
      };
    }
    StageUtils.validateObject(criteria, "$unwind");
    this.pipeline.push({
      $unwind: criteria
    });
    return this;
  }
  addFields(criteria) {
    StageUtils.validateObject(criteria, "$addFields");
    this.pipeline.push({
      $addFields: criteria
    });
    return this;
  }
  limit(criteria) {
    StageUtils.validateObject(criteria, "$limit");
    this.pipeline.push({
      $limit: Math.floor(criteria)
    });
    return this;
  }
  skip(criteria) {
    StageUtils.validateObject(criteria, "$skip");
    this.pipeline.push({
      $skip: Math.floor(criteria)
    });
    return this;
  }
  /**
   * Devuelve el pipeline actual construido hasta el momento (Útil para debugging o tests)
   */
  getPipeline() {
    return [
      ...this.pipeline
    ];
  }
  async runStages(data) {
    StageUtils.validateArray(data, "$runStages");
    if (this.pipeline.length === 0) return [
      ...data
    ];
    try {
      const pipelineToExecute = [
        ...this.pipeline
      ];
      this.pipeline = [];
      return await this.pipelineOrchestrator.executePipeline(data, pipelineToExecute);
    } catch (error) {
      this.pipeline = [];
      throw error;
    }
  }
};
AggregationBuilder = _ts_decorate27([
  (0, import_common29.Injectable)(),
  _ts_metadata18("design:type", Function),
  _ts_metadata18("design:paramtypes", [
    typeof PipelineOrchestrator === "undefined" ? Object : PipelineOrchestrator
  ])
], AggregationBuilder);

// src/stages/interfaces/aggregation.factory.ts
var import_common30 = require("@nestjs/common");
function _ts_decorate28(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate28, "_ts_decorate");
function _ts_metadata19(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata19, "_ts_metadata");
var AggregationFactory = class {
  static {
    __name(this, "AggregationFactory");
  }
  orchestrator;
  constructor(orchestrator) {
    this.orchestrator = orchestrator;
  }
  /**
   * Crea una instancia fresca de AggregationBuilder.
   * Al usar ModuleRef, garantizamos que NestJS gestione el ciclo de vida TRANSIENT correctamente.
   */
  create() {
    return new AggregationBuilder(this.orchestrator);
  }
};
AggregationFactory = _ts_decorate28([
  (0, import_common30.Injectable)(),
  _ts_metadata19("design:type", Function),
  _ts_metadata19("design:paramtypes", [
    typeof PipelineOrchestrator === "undefined" ? Object : PipelineOrchestrator
  ])
], AggregationFactory);

// src/JoinSheetTabs/JoinSheetTabsService.ts
var import_common32 = require("@nestjs/common");

// src/JoinSheetTabs/JoinEngine.ts
var import_common31 = require("@nestjs/common");

// src/core/repository/repository.registry.ts
var RepositoryRegistry = class {
  static {
    __name(this, "RepositoryRegistry");
  }
  static repos = /* @__PURE__ */ new Map();
  static register(entityClass, repoInstance) {
    this.repos.set(entityClass, repoInstance);
  }
  static getRepo(entityClass) {
    const repo = this.repos.get(entityClass);
    if (!repo) {
      throw new Error(`[RepositoryRegistry] No se encontr\xF3 un repositorio registrado para la entidad: ${entityClass.name}`);
    }
    return repo;
  }
};

// src/JoinSheetTabs/JoinEngine.ts
function _ts_decorate29(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate29, "_ts_decorate");
function _ts_metadata20(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata20, "_ts_metadata");
var JoinEngine = class _JoinEngine {
  static {
    __name(this, "JoinEngine");
  }
  metadataRegistry;
  logger = new import_common31.Logger(_JoinEngine.name);
  constructor(metadataRegistry) {
    this.metadataRegistry = metadataRegistry;
  }
  async execute(parents, parentEntityClass, propertyName, childProjection) {
    if (!parents || parents.length === 0) return parents;
    const config = this.metadataRegistry.getJoinConfig(parentEntityClass, propertyName);
    if (!config) {
      this.logger.warn(`\u26A0\uFE0F [JoinEngine] No hay metadata de relaci\xF3n para '${propertyName}' en ${parentEntityClass.name}`);
      return parents;
    }
    const targetRepo = RepositoryRegistry.getRepo(config.targetEntity);
    const parentIds = [
      ...new Set(parents.map((p) => p[config.localField]).filter((val) => val !== void 0 && val !== null && val !== ""))
    ];
    if (parentIds.length === 0) return parents;
    const findOptions = {};
    if (childProjection && Object.keys(childProjection).length > 0) {
      findOptions.projection = {
        ...childProjection,
        [config.foreignKey]: 1
        // 👈 Inyección silenciosa de la FK obligatoria
      };
    }
    const children = await targetRepo.find({
      [config.foreignKey]: {
        $in: parentIds
      }
    }, findOptions);
    const map2 = /* @__PURE__ */ new Map();
    for (const child of children) {
      const key = child[config.foreignKey];
      if (!map2.has(key)) map2.set(key, []);
      map2.get(key).push(child);
    }
    return parents.map((parent) => {
      const parentKeyVal = parent[config.localField];
      const related = map2.get(parentKeyVal) || [];
      return {
        ...parent,
        [propertyName]: config.isMany ? related : related[0] || null
      };
    });
  }
};
JoinEngine = _ts_decorate29([
  (0, import_common31.Injectable)(),
  _ts_metadata20("design:type", Function),
  _ts_metadata20("design:paramtypes", [
    typeof MetadataRegistry === "undefined" ? Object : MetadataRegistry
  ])
], JoinEngine);

// src/JoinSheetTabs/JoinSheetTabsService.ts
function _ts_decorate30(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate30, "_ts_decorate");
function _ts_metadata21(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata21, "_ts_metadata");
var JoinSheetTabsService = class _JoinSheetTabsService {
  static {
    __name(this, "JoinSheetTabsService");
  }
  joinEngine;
  logger = new import_common32.Logger(_JoinSheetTabsService.name);
  constructor(joinEngine) {
    this.joinEngine = joinEngine;
  }
  /**
   * 🚀 NUEVO: Método puente adaptador para el SheetsRepository.
   * Extrae de forma segura los paths y las proyecciones desde las opciones de consulta
   * y los convierte al formato estricto que requiere tu JoinEngine.
   */
  async resolveJoins(results, entityClass, options) {
    if (!results || results.length === 0 || !options?.populate) {
      return results;
    }
    const populatePaths = /* @__PURE__ */ new Set();
    const childProjections = {};
    const rawPopulateList = Array.isArray(options.populate) ? options.populate : [
      options.populate
    ];
    for (const item of rawPopulateList) {
      if (typeof item === "string") {
        populatePaths.add(item);
      } else if (item && typeof item === "object" && "path" in item) {
        const popOpt = item;
        populatePaths.add(popOpt.path);
        if (popOpt.select) {
          childProjections[popOpt.path] = this.normalizeProjection(popOpt.select);
        }
      }
    }
    if (populatePaths.size === 0) {
      return results;
    }
    return this.orchestrate(results, entityClass, populatePaths, childProjections);
  }
  /**
   * 🚀 NUEVO: Método hook para interceptar borrados en cascada desde el repositorio.
   * De momento queda declarado de forma segura para evitar fallos de ejecución (no-op).
   */
  async handleCascadeDelete(doc, entityClass) {
    this.logger.debug(`[CascadeDelete] Procesando entidad ${entityClass.name}`);
  }
  normalizeProjection(select) {
    if (typeof select === "object" && !Array.isArray(select)) {
      const result = {};
      for (const key of Object.keys(select)) {
        result[key] = select[key] ? 1 : 0;
      }
      return result;
    }
    const fields = Array.isArray(select) ? select : select.split(" ");
    const projection = {};
    for (const field of fields) {
      const cleanField = field.trim();
      if (cleanField) projection[cleanField] = 1;
    }
    return projection;
  }
  /**
   * Coordina y ejecuta en lotes (batch) todos los joins solicitados para una consulta.
   * 🔥 TU MÉTODO ORIGINAL INTACTO 🔥
   */
  async orchestrate(results, entityClass, populatePaths, childProjections) {
    if (!results || results.length === 0 || populatePaths.size === 0) {
      return results;
    }
    let orchestratedResults = [
      ...results
    ];
    this.logger.log(`\u{1F680} [JoinSheetTabs] Iniciando orquestaci\xF3n de ${populatePaths.size} relaci\xF3n(es) para ${entityClass.name}`);
    for (const propertyName of populatePaths) {
      try {
        const childProj = childProjections[propertyName] || {};
        orchestratedResults = await this.joinEngine.execute(orchestratedResults, entityClass, propertyName, childProj);
      } catch (error) {
        this.logger.error(`\u274C [JoinSheetTabs] Error cr\xEDtico al orquestar la relaci\xF3n '${propertyName}' en ${entityClass.name}. Detalle: ${error.message}`, error.stack);
        throw new Error(`[JoinSheetTabsModule] Failed to populate relation '${propertyName}': ${error.message}`);
      }
    }
    return orchestratedResults;
  }
};
JoinSheetTabsService = _ts_decorate30([
  (0, import_common32.Injectable)(),
  _ts_metadata21("design:type", Function),
  _ts_metadata21("design:paramtypes", [
    typeof JoinEngine === "undefined" ? Object : JoinEngine
  ])
], JoinSheetTabsService);

// src/core/repository/repository-core.facade.ts
function _ts_decorate31(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate31, "_ts_decorate");
function _ts_metadata22(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata22, "_ts_metadata");
function _ts_param13(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param13, "_ts_param");
var RepositoryCoreFacade = class {
  static {
    __name(this, "RepositoryCoreFacade");
  }
  metadata;
  dataSource;
  uow;
  hydrator;
  queryEngine;
  mutationEngine;
  readGateway;
  gateway;
  transformer;
  populateEngine;
  aggregationBuilder;
  aggregationFactory;
  joinSheetTabsService;
  cacheManager;
  constructor(metadata, dataSource, uow, hydrator, queryEngine, mutationEngine, readGateway, gateway, transformer, populateEngine, aggregationBuilder, aggregationFactory, joinSheetTabsService, cacheManager) {
    this.metadata = metadata;
    this.dataSource = dataSource;
    this.uow = uow;
    this.hydrator = hydrator;
    this.queryEngine = queryEngine;
    this.mutationEngine = mutationEngine;
    this.readGateway = readGateway;
    this.gateway = gateway;
    this.transformer = transformer;
    this.populateEngine = populateEngine;
    this.aggregationBuilder = aggregationBuilder;
    this.aggregationFactory = aggregationFactory;
    this.joinSheetTabsService = joinSheetTabsService;
    this.cacheManager = cacheManager;
  }
};
RepositoryCoreFacade = _ts_decorate31([
  (0, import_common33.Injectable)(),
  _ts_param13(13, (0, import_common33.Inject)(import_cache_manager2.CACHE_MANAGER)),
  _ts_metadata22("design:type", Function),
  _ts_metadata22("design:paramtypes", [
    typeof MetadataRegistry === "undefined" ? Object : MetadataRegistry,
    typeof DataSourceManager === "undefined" ? Object : DataSourceManager,
    typeof UnitOfWork === "undefined" ? Object : UnitOfWork,
    typeof SheetDocumentHydrator === "undefined" ? Object : SheetDocumentHydrator,
    typeof QueryEngine === "undefined" ? Object : QueryEngine,
    typeof MutationEngine === "undefined" ? Object : MutationEngine,
    typeof GasQueryGateway === "undefined" ? Object : GasQueryGateway,
    typeof SheetDataGateway === "undefined" ? Object : SheetDataGateway,
    typeof SheetDataTransformer === "undefined" ? Object : SheetDataTransformer,
    typeof PopulateEngine === "undefined" ? Object : PopulateEngine,
    typeof AggregationBuilder === "undefined" ? Object : AggregationBuilder,
    typeof AggregationFactory === "undefined" ? Object : AggregationFactory,
    typeof JoinSheetTabsService === "undefined" ? Object : JoinSheetTabsService,
    typeof Cache === "undefined" ? Object : Cache
  ])
], RepositoryCoreFacade);

// src/core/repository/sheets-repository.factory.ts
function _ts_decorate32(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate32, "_ts_decorate");
function _ts_metadata23(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata23, "_ts_metadata");
var SheetsRepositoryFactory = class {
  static {
    __name(this, "SheetsRepositoryFactory");
  }
  moduleRef;
  // El constructor queda completamente limpio. Ya no necesitas inyectar los 9 singletons uno por uno.
  constructor(moduleRef) {
    this.moduleRef = moduleRef;
  }
  /**
   * Fabrica dinámicamente un SheetsRepository ligado al Request actual.
   */
  async create(entityClass) {
    const coreFacade = await this.moduleRef.resolve(RepositoryCoreFacade);
    return new SheetsRepository(entityClass, coreFacade);
  }
};
SheetsRepositoryFactory = _ts_decorate32([
  (0, import_common34.Injectable)(),
  _ts_metadata23("design:type", Function),
  _ts_metadata23("design:paramtypes", [
    typeof import_core2.ModuleRef === "undefined" ? Object : import_core2.ModuleRef
  ])
], SheetsRepositoryFactory);

// src/core/cache/cache.module.ts
var import_common35 = require("@nestjs/common");
var import_cache_manager3 = require("@nestjs/cache-manager");
function _ts_decorate33(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate33, "_ts_decorate");
var SheetCacheModule = class {
  static {
    __name(this, "SheetCacheModule");
  }
};
SheetCacheModule = _ts_decorate33([
  (0, import_common35.Global)(),
  (0, import_common35.Module)({
    imports: [
      import_cache_manager3.CacheModule.register({
        ttl: 6e4 * 5,
        max: 100
      })
    ],
    exports: [
      import_cache_manager3.CacheModule
    ]
  })
], SheetCacheModule);

// src/core/interceptors/sheet-odm-serialize.interceptor.ts
var import_common36 = require("@nestjs/common");
var import_operators2 = require("rxjs/operators");
function _ts_decorate34(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate34, "_ts_decorate");
var SheetOdmSerializeInterceptor = class {
  static {
    __name(this, "SheetOdmSerializeInterceptor");
  }
  intercept(context, next) {
    return next.handle().pipe((0, import_operators2.map)((data) => this.serialize(data)));
  }
  serialize(data) {
    if (!data) return data;
    if (Array.isArray(data)) {
      return data.map((item) => this.serialize(item));
    }
    if (typeof data === "object") {
      if (data instanceof Date) {
        return data;
      }
      if (typeof data.toJSON === "function") {
        const rawJson = data.toJSON();
        return this.serialize(rawJson);
      }
      const serializedObject = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          serializedObject[key] = this.serialize(data[key]);
        }
      }
      return serializedObject;
    }
    return data;
  }
};
SheetOdmSerializeInterceptor = _ts_decorate34([
  (0, import_common36.Injectable)()
], SheetOdmSerializeInterceptor);

// src/JoinSheetTabs/JoinSheetTabsModule.ts
var import_common37 = require("@nestjs/common");
function _ts_decorate35(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate35, "_ts_decorate");
var JoinSheetTabsModule = class {
  static {
    __name(this, "JoinSheetTabsModule");
  }
};
JoinSheetTabsModule = _ts_decorate35([
  (0, import_common37.Module)({
    providers: [
      JoinEngine,
      JoinSheetTabsService,
      // Al proveer MetadataRegistry aquí, NestJS resolverá la instancia. 
      // Si ya está en un módulo global, lo ideal sería importarlo, pero al ser inyectable funciona perfectamente.
      MetadataRegistry
    ],
    exports: [
      JoinSheetTabsService,
      JoinEngine
    ]
  })
], JoinSheetTabsModule);

// src/sheetOdm.module.ts
function _ts_decorate36(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate36, "_ts_decorate");
function _ts_metadata24(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata24, "_ts_metadata");
var CORE_SHARED_SERVICES = [
  RepositoryCoreFacade,
  DataSourceManager,
  MetadataRegistry,
  OdmDiagnosticsService,
  SheetsRepositoryFactory,
  ExpressionEngine,
  QueryEngine,
  MutationEngine,
  SheetDocumentHydrator,
  SheetDataGateway,
  InfrastructureProvisioner,
  PipelineOrchestrator,
  AggregationBuilder,
  AggregationFactory
];
var INTERNAL_SERVICES = [
  GasQueryGateway,
  GoogleHealthService,
  SheetDataTransformer,
  PopulateEngine,
  {
    provide: import_core3.APP_INTERCEPTOR,
    useClass: GasTelemetryInterceptor
  },
  {
    provide: import_core3.APP_INTERCEPTOR,
    useClass: SheetOdmSerializeInterceptor
  }
];
var TRANSFORM_OPERATORS = [
  ConcatOperator,
  IfOperator,
  MultiplyOperator,
  IncOperator,
  MinMaxOperator,
  RoundOperator,
  MathOperator,
  UpperOperator,
  TrimOperator,
  DateAddOperator,
  TimeDiffOperator,
  AggregateOperator
];
var FILTER_OPERATORS = [
  EqOperator,
  GtOperator,
  InOperator,
  NinOperator,
  NeOperator,
  GteOperator,
  LtOperator,
  LteOperator,
  RegexOperator,
  ExistsOperator,
  DateTransformer
];
var PIPELINE_STAGES = [
  MatchStage,
  SortStage,
  LimitStage,
  SkipStage,
  ProjectStage,
  AddFieldsStage
];
var ALL_COMMON_PROVIDERS = [
  ...INTERNAL_SERVICES,
  ...CORE_SHARED_SERVICES,
  ...TRANSFORM_OPERATORS,
  ...FILTER_OPERATORS,
  ...PIPELINE_STAGES,
  {
    provide: DATA_TRANSFORM_OPERATOR,
    useFactory: /* @__PURE__ */ __name((...operators) => operators, "useFactory"),
    inject: TRANSFORM_OPERATORS
  },
  {
    provide: FILTER_OPERATOR,
    useFactory: /* @__PURE__ */ __name((...operators) => operators, "useFactory"),
    inject: FILTER_OPERATORS
  },
  {
    provide: PIPELINE_STAGE,
    useFactory: /* @__PURE__ */ __name((...stages) => stages, "useFactory"),
    inject: PIPELINE_STAGES
  }
];
var SheetOdmModule = class _SheetOdmModule {
  static {
    __name(this, "SheetOdmModule");
  }
  provisioner;
  logger = new import_common38.Logger("SheetOdm");
  static hasBootstrapped = false;
  constructor(provisioner) {
    this.provisioner = provisioner;
  }
  async onApplicationBootstrap() {
    if (process.env.NODE_ENV === "test" || _SheetOdmModule.hasBootstrapped) {
      return;
    }
    _SheetOdmModule.hasBootstrapped = true;
    this.logger.log("--- \u{1F680} [SheetODM] Iniciando sincronizaci\xF3n de infraestructura ---");
    try {
      await this.provisioner.syncSchema();
      this.logger.log("\u2705 [SheetODM] Infraestructura lista.");
    } catch (err) {
      this.logger.error(`\u274C [SheetODM] Error de inicializaci\xF3n: ${err.message}`);
    }
  }
  // ========================================================================
  // CONFIGURACIÓN ASÍNCRONA (Root Async)
  // ========================================================================
  static forRootAsync(options) {
    if (!options.useFactory) {
      throw new Error("El m\xE9todo [useFactory] es requerido en forRootAsync para SheetOdmModule.");
    }
    const factory = options.useFactory;
    return {
      global: true,
      module: _SheetOdmModule,
      imports: [
        SheetCacheModule,
        UowModule,
        JoinSheetTabsModule,
        ...options.imports || [],
        import_auth8.SpreadsheetAuthModule.registerAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: /* @__PURE__ */ __name(async (...args) => {
            const config = await factory(...args);
            return config.auth;
          }, "useFactory")
        }),
        OutboxModule.registerAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: /* @__PURE__ */ __name(async (...args) => {
            const config = await factory(...args);
            return config.odm;
          }, "useFactory")
        })
      ],
      controllers: [
        OdmDiagnosticsController
      ],
      providers: [
        {
          provide: "DATABASE_OPTIONS",
          useFactory: /* @__PURE__ */ __name(async (...args) => {
            const config = await factory(...args);
            return config.odm;
          }, "useFactory"),
          inject: options.inject || []
        },
        {
          provide: import_auth8.SHEET_ODM_OPTIONS,
          useFactory: /* @__PURE__ */ __name(async (...args) => {
            const config = await factory(...args);
            return config.odm;
          }, "useFactory"),
          inject: options.inject || []
        },
        {
          provide: PostgresProvider,
          useFactory: /* @__PURE__ */ __name((opts) => new PostgresProvider(opts), "useFactory"),
          inject: [
            import_auth8.SHEET_ODM_OPTIONS
          ]
        },
        {
          provide: POSTGRES_TOKEN,
          useExisting: PostgresProvider
        },
        ...ALL_COMMON_PROVIDERS
      ],
      exports: [
        UowModule,
        OutboxModule,
        PostgresProvider,
        POSTGRES_TOKEN,
        SheetCacheModule,
        JoinSheetTabsModule,
        ...CORE_SHARED_SERVICES
      ]
    };
  }
  // ========================================================================
  // CONFIGURACIÓN SÍNCRONA (Root Sync)
  // ========================================================================
  static forRoot(options) {
    return {
      global: true,
      module: _SheetOdmModule,
      imports: [
        import_auth8.SpreadsheetAuthModule.register(options.auth),
        OutboxModule.register(options.odm),
        SheetCacheModule,
        UowModule,
        JoinSheetTabsModule
      ],
      controllers: [
        OdmDiagnosticsController
      ],
      providers: [
        {
          provide: "DATABASE_OPTIONS",
          useValue: options.odm
        },
        {
          provide: import_auth8.SHEET_ODM_OPTIONS,
          useValue: options.odm
        },
        {
          provide: PostgresProvider,
          useFactory: /* @__PURE__ */ __name((opts) => new PostgresProvider(opts), "useFactory"),
          inject: [
            import_auth8.SHEET_ODM_OPTIONS
          ]
        },
        {
          provide: POSTGRES_TOKEN,
          useExisting: PostgresProvider
        },
        ...ALL_COMMON_PROVIDERS
      ],
      exports: [
        UowModule,
        OutboxModule,
        PostgresProvider,
        POSTGRES_TOKEN,
        SheetCacheModule,
        JoinSheetTabsModule,
        ...CORE_SHARED_SERVICES
      ]
    };
  }
  // ========================================================================
  // REGISTRO DE ENTIDADES (Feature)
  // ========================================================================
  static forFeature(entities) {
    const providers = entities.flatMap((entity) => {
      MetadataRegistry.register(entity);
      const repositoryToken = `SheetsRepository_${entity.name}`;
      const repositoryProvider = {
        provide: repositoryToken,
        useFactory: /* @__PURE__ */ __name((coreFacade) => new SheetsRepository(entity, coreFacade), "useFactory"),
        inject: [
          RepositoryCoreFacade
        ]
      };
      const modelProvider = {
        provide: `${entity.name}Model`,
        useFactory: /* @__PURE__ */ __name((repo) => {
          const model = createModel(entity, repo);
          ModelRegistry.register(entity.name, model);
          return model;
        }, "useFactory"),
        inject: [
          repositoryToken
        ]
      };
      return [
        repositoryProvider,
        modelProvider
      ];
    });
    return {
      module: _SheetOdmModule,
      providers,
      exports: providers
    };
  }
};
SheetOdmModule = _ts_decorate36([
  (0, import_common38.Global)(),
  (0, import_common38.Module)({
    imports: [
      import_axios2.HttpModule
    ]
  }),
  _ts_metadata24("design:type", Function),
  _ts_metadata24("design:paramtypes", [
    typeof InfrastructureProvisioner === "undefined" ? Object : InfrastructureProvisioner
  ])
], SheetOdmModule);

// src/core/decorators/table.decorator.ts
var import_reflect_metadata = require("reflect-metadata");
function Table(nameOrOptions, options) {
  return (target) => {
    const classConstructor = target;
    const isNameProvided = typeof nameOrOptions === "string";
    const name = isNameProvided ? nameOrOptions : void 0;
    const finalOptions = isNameProvided ? options : nameOrOptions;
    const finalName = name ? name.toUpperCase() : `${target.name.replace(/(Entity|Model|Schema|Dto)$/i, "")}S`.toUpperCase();
    Reflect.defineMetadata(SHEETS_TABLE_NAME, finalName, classConstructor);
    if (finalOptions?.dto) {
      Reflect.defineMetadata(SHEETS_DTO, finalOptions.dto, classConstructor);
    } else {
      throw new Error(`\u274C [ODM Decorator Error] La entidad '${target.name}' requiere un DTO configurado en @Table.`);
    }
    if (finalOptions?.spreadsheetId) {
      Reflect.defineMetadata(SHEETS_SPREADSHEET_ID, finalOptions.spreadsheetId, classConstructor);
    }
    MetadataRegistry.register(classConstructor);
  };
}
__name(Table, "Table");

// src/core/decorators/primarykey.decorator.ts
var import_reflect_metadata2 = require("reflect-metadata");
function PrimaryKey() {
  return (target, propertyKey) => {
    Reflect.defineMetadata(SHEETS_PRIMARY_KEY, propertyKey.toString(), target.constructor);
  };
}
__name(PrimaryKey, "PrimaryKey");

// src/core/decorators/column.decorator.ts
var import_reflect_metadata3 = require("reflect-metadata");
function Column(options = {}) {
  return (target, propertyKey) => {
    const classConstructor = typeof target === "function" ? target : target.constructor;
    const propString = propertyKey.toString();
    let columnsList = Reflect.getOwnMetadata(SHEETS_COLUMN_LIST, classConstructor);
    if (!columnsList) {
      columnsList = [
        ...Reflect.getMetadata(SHEETS_COLUMN_LIST, classConstructor) || []
      ];
    }
    if (!columnsList.includes(propString)) {
      columnsList.push(propString);
      Reflect.defineMetadata(SHEETS_COLUMN_LIST, columnsList, classConstructor);
    }
    const config = {
      name: options.name || propString,
      type: options.type || "string",
      required: options.required ?? false,
      default: options.default ?? null,
      isDeleteControl: options.isDeleteControl || false,
      isAutoIncrement: options.isAutoIncrement || options.generated === "increment",
      generated: options.generated,
      validation: options.validation,
      index: options.index || false
    };
    let details = Reflect.getOwnMetadata(SHEETS_COLUMN_DETAILS, classConstructor);
    if (!details) {
      details = {
        ...Reflect.getMetadata(SHEETS_COLUMN_DETAILS, classConstructor) || {}
      };
    }
    details[propString] = config;
    Reflect.defineMetadata(SHEETS_COLUMN_DETAILS, details, classConstructor);
    if (config.isDeleteControl) {
      Reflect.defineMetadata(SHEETS_DELETE_CONTROL, propString, classConstructor);
    }
  };
}
__name(Column, "Column");

// src/core/decorators/subCollection.decorator.ts
var import_reflect_metadata4 = require("reflect-metadata");
function SubCollection(arg, options) {
  return (target, propertyKey) => {
    const propertyName = propertyKey.toString();
    const targetEntityFn = typeof arg === "function" && !arg.prototype ? arg : () => arg;
    const explicitJoinColumn = options.joinColumn;
    const relationConfig = {
      type: "subcollection",
      targetEntity: targetEntityFn,
      isMany: true,
      propertyName,
      joinColumn: explicitJoinColumn,
      onDelete: options.onDelete || "CASCADE"
    };
    const existingList = Reflect.getOwnMetadata(SHEETS_RELATIONS_LIST, target) || [];
    const newList = Array.from(/* @__PURE__ */ new Set([
      ...existingList,
      propertyName
    ]));
    Reflect.defineMetadata(SHEETS_RELATIONS_LIST, newList, target);
    Reflect.defineMetadata(SHEETS_ALL_RELATIONS, relationConfig, target, propertyName);
  };
}
__name(SubCollection, "SubCollection");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CONNECTION_STABILITY,
  Column,
  DataSourceManager,
  HookType,
  IBaseProvider,
  IGoogleSheetProvider,
  INTERNAL_NEW,
  INTERNAL_REPO,
  IPostgresProvider,
  IProvider,
  InjectModel,
  MetadataRegistry,
  OutboxModule,
  POSTGRES_TOKEN,
  PostgresConfig,
  PrimaryKey,
  ROW_INDEX_SYMBOL,
  RepositoryCoreFacade,
  SHEETS_ALL_RELATIONS,
  SHEETS_COLUMN_DETAILS,
  SHEETS_COLUMN_LIST,
  SHEETS_DELETE_CONTROL,
  SHEETS_DTO,
  SHEETS_HOOKS,
  SHEETS_PRIMARY_KEY,
  SHEETS_RELATIONS_LIST,
  SHEETS_REPOSITORY_MARKER,
  SHEETS_SPREADSHEET_ID,
  SHEETS_SUB_COLLECTIONS,
  SHEETS_TABLE_NAME,
  SHEETS_VERSION_FIELD,
  SHEETS_VIRTUALS,
  SHEETS_VIRTUAL_COLUMNS,
  SHEET_ODM_MODULE_OPTIONS,
  SheetOdmModule,
  SheetOdmModuleOptions,
  SheetsRepository,
  SubCollection,
  TABLE_COLUMN_KEY,
  Table
});
//# sourceMappingURL=index.js.map