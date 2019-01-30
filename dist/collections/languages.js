"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_1 = require("../models/language");
const base_collection_1 = require("./base_collection");
class Languages extends base_collection_1.BaseCollection {
    system_languages(params) {
        this.createPromise('GET', {}, this.populateArrayFromJson, this.handleReject, null, 'system/languages');
    }
    create(body, params = {}) {
        return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body);
    }
}
Languages.rootElementName = 'projects';
Languages.prefixURI = 'projects/{!:project_id}/languages/{:id}';
Languages.elementClass = language_1.Language;
exports.Languages = Languages;
//# sourceMappingURL=languages.js.map