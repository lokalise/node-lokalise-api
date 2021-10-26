"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokaliseApi = void 0;
const api_methods_1 = require("./api_methods");
class LokaliseApi extends api_methods_1.LokaliseApiMethods {
    /**
     * Instantiate LokaliseApi to have access to methods
     * @param params  object, mandatory
     * @returns       LokaliseApi object to work with.
     */
    constructor(params) {
        super();
        LokaliseApi.apiKey = Object(params)["apiKey"];
        if (LokaliseApi.apiKey == null || LokaliseApi.apiKey.length == 0) {
            throw new Error("Error: Instantiation failed: Please pass an API key");
        }
        const compression = Object(params)["enableCompression"];
        if (compression == null) {
            LokaliseApi.enableCompression = false;
        }
        else {
            LokaliseApi.enableCompression = compression;
        }
        return this;
    }
}
exports.LokaliseApi = LokaliseApi;
LokaliseApi.apiKey = null;
LokaliseApi.enableCompression = false;
LokaliseApi.tokenHeader = "x-api-token";
//# sourceMappingURL=lokalise.js.map