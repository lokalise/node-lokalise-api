"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokaliseApiOAuth = exports.LokaliseAuth = exports.LokaliseApi = void 0;
const lokalise_api_1 = require("./lokalise/lokalise_api");
Object.defineProperty(exports, "LokaliseApi", { enumerable: true, get: function () { return lokalise_api_1.LokaliseApi; } });
const lokalise_api_oauth_1 = require("./lokalise/lokalise_api_oauth");
Object.defineProperty(exports, "LokaliseApiOAuth", { enumerable: true, get: function () { return lokalise_api_oauth_1.LokaliseApiOAuth; } });
const lokalise_auth_1 = require("./oauth2/lokalise_auth");
Object.defineProperty(exports, "LokaliseAuth", { enumerable: true, get: function () { return lokalise_auth_1.LokaliseAuth; } });
__exportStar(require("./interfaces"), exports);
//# sourceMappingURL=main.js.map