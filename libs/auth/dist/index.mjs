var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/google-client.provider.ts
import { Inject, Injectable } from "@nestjs/common";
import { google } from "googleapis";

// src/auth.constants.ts
var AUTH_OPTIONS = "AUTH_OPTIONS";
var SHEET_ODM_OPTIONS = "SHEET_ODM_OPTIONS";

// src/auth-options.interface.ts
var GoogleCredentials = class {
  static {
    __name(this, "GoogleCredentials");
  }
  type;
  project_id;
  private_key_id;
  private_key;
  client_email;
  client_id;
  auth_uri;
  token_uri;
  auth_provider_x509_cert_url;
  client_x509_cert_url;
  universe_domain;
};
var AuthModuleOptions = class {
  static {
    __name(this, "AuthModuleOptions");
  }
  googleDriveConfig;
};
var GoogleDriveConfig = class {
  static {
    __name(this, "GoogleDriveConfig");
  }
  client_email;
  private_key;
};
var SpreadsheetsAuthOptions = class {
  static {
    __name(this, "SpreadsheetsAuthOptions");
  }
  googleDriveConfig;
  googleDriveBaseFolderId;
  spreadsheetId;
  webAppUrl;
  apiKey;
  formatDates;
};

// src/google-client.provider.ts
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
var GoogleClientProvider = class {
  static {
    __name(this, "GoogleClientProvider");
  }
  config;
  _sheets;
  _drive;
  _script;
  docs;
  constructor(config) {
    this.config = config;
    if (!this.config) {
      console.error("\u274C GoogleAuthProvider: 'CONFIG' es undefined en el constructor");
    }
  }
  get script() {
    if (!this._script) {
      this.initialize();
    }
    return this._script;
  }
  // Usamos un Getter para inicialización bajo demanda (lazy-loading)
  get sheets() {
    if (!this._sheets) {
      this.initialize();
    }
    return this._sheets;
  }
  get drive() {
    if (!this._drive) {
      this.initialize();
    }
    return this._drive;
  }
  initialize() {
    const googleConfig = this.config.googleDriveConfig;
    if (!googleConfig || !googleConfig.client_email) {
      throw new Error("Configuraci\xF3n de Google no cargada en googleDriveConfig. Verifica tu .env o AppModule.");
    }
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: googleConfig.client_email,
        private_key: googleConfig.private_key
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive.readonly",
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/spreadsheets.readonly",
        "https://www.googleapis.com/auth/drive.metadata.readonly",
        "https://www.googleapis.com/auth/script.external_request",
        "https://www.googleapis.com/auth/documents",
        "https://www.googleapis.com/auth/documents.readonly"
      ]
    });
    this._drive = google.drive({
      version: "v3",
      auth
    });
    this._sheets = google.sheets({
      version: "v4",
      auth
    });
    this._script = google.script({
      version: "v1",
      auth
    });
    this.docs = google.docs({
      version: "v1",
      auth
    });
  }
};
GoogleClientProvider = _ts_decorate([
  Injectable(),
  _ts_param(0, Inject(AUTH_OPTIONS)),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof AuthModuleOptions === "undefined" ? Object : AuthModuleOptions
  ])
], GoogleClientProvider);

// src/auth.module.ts
import { Module, Global } from "@nestjs/common";
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
var SpreadsheetAuthModule = class _SpreadsheetAuthModule {
  static {
    __name(this, "SpreadsheetAuthModule");
  }
  static register(options) {
    return {
      module: _SpreadsheetAuthModule,
      providers: [
        {
          provide: AUTH_OPTIONS,
          useValue: options
        },
        GoogleClientProvider
      ],
      exports: [
        GoogleClientProvider
      ]
    };
  }
  static registerAsync(options) {
    return {
      module: _SpreadsheetAuthModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        GoogleClientProvider
      ],
      exports: [
        GoogleClientProvider
      ]
    };
  }
  static createAsyncProviders(options) {
    if (options.useFactory) {
      return [
        {
          provide: AUTH_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || []
        }
      ];
    }
    if (options.useClass) {
      return [
        {
          provide: AUTH_OPTIONS,
          useFactory: /* @__PURE__ */ __name(async (optionsFactory) => await optionsFactory.createAuthOptions(), "useFactory"),
          inject: [
            options.useClass
          ]
        },
        options.useClass
      ];
    }
    if (options.useExisting) {
      return [
        {
          provide: AUTH_OPTIONS,
          useFactory: /* @__PURE__ */ __name(async (optionsFactory) => await optionsFactory.createAuthOptions(), "useFactory"),
          inject: [
            options.useExisting
          ]
        }
      ];
    }
    throw new Error("Debes proporcionar useFactory, useClass o useExisting en registerAsync");
  }
};
SpreadsheetAuthModule = _ts_decorate2([
  Global(),
  Module({})
], SpreadsheetAuthModule);
export {
  AUTH_OPTIONS,
  AuthModuleOptions,
  GoogleClientProvider,
  GoogleCredentials,
  GoogleDriveConfig,
  SHEET_ODM_OPTIONS,
  SpreadsheetAuthModule,
  SpreadsheetsAuthOptions
};
//# sourceMappingURL=index.mjs.map