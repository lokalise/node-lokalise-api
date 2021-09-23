"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokSample = void 0;
const lokalise_api_1 = require("./lokalise_api");
class LokSample extends lokalise_api_1.LokaliseApi {
    constructor(params) {
        super(params);
        this.clientData.token = "OMG!!!";
    }
}
exports.LokSample = LokSample;
//# sourceMappingURL=lok_sample.js.map