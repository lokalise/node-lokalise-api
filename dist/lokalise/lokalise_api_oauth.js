"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokaliseApiOAuth = void 0;
const lokalise_api_1 = require("./lokalise_api");
class LokaliseApiOAuth extends lokalise_api_1.LokaliseApi {
    constructor(params) {
        super(params);
        const tokenType = Object(params)["tokenType"];
        if (tokenType) {
            this.clientData.tokenType = tokenType;
        }
        else {
            this.clientData.tokenType = "Bearer";
        }
        this.clientData.authHeader = "Authorization";
    }
}
exports.LokaliseApiOAuth = LokaliseApiOAuth;
//# sourceMappingURL=lokalise_api_oauth.js.map