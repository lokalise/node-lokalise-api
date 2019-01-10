"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_methods_1 = require("./api_methods");
class LokaliseApi extends api_methods_1.LocaliseApiMethods {
    constructor(apiKey) {
        super();
        LokaliseApi.apiKey = apiKey;
        if (LokaliseApi.apiKey.length == 0) {
            throw new Error("Error: Instantiation failed: Please pass api key");
        }
        return this;
    }
}
LokaliseApi.apiKey = '44fd964aa8ac7196762d61a4949326fea38a5f60';
exports.LokaliseApi = LokaliseApi;
//# sourceMappingURL=lokalise.js.map