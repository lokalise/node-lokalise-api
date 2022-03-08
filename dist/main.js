"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokaliseApiOAuth = exports.LokaliseAuth = exports.LokaliseApi = void 0;
const lokalise_api_1 = require("./lokalise/lokalise_api");
Object.defineProperty(exports, "LokaliseApi", { enumerable: true, get: function () { return lokalise_api_1.LokaliseApi; } });
const lokalise_api_oauth_1 = require("./lokalise/lokalise_api_oauth");
Object.defineProperty(exports, "LokaliseApiOAuth", { enumerable: true, get: function () { return lokalise_api_oauth_1.LokaliseApiOAuth; } });
const lokalise_auth_1 = require("./oauth2/lokalise_auth");
Object.defineProperty(exports, "LokaliseAuth", { enumerable: true, get: function () { return lokalise_auth_1.LokaliseAuth; } });
//# sourceMappingURL=main.js.map