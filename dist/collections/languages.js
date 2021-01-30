"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = void 0;
const language_1 = require("../models/language");
const base_collection_1 = require("./base_collection");
class Languages extends base_collection_1.BaseCollection {
    system_languages(params) {
        return this.createPromise("GET", params, this.populateArrayFromJson, this.handleReject, null, "system/languages");
    }
    create(raw_body, params) {
        const body = { languages: this.objToArray(raw_body) };
        return this.createPromise("POST", params, this.populateArrayFromJson, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
exports.Languages = Languages;
Languages.rootElementName = "languages";
Languages.rootElementNameSingular = "language";
Languages.prefixURI = "projects/{!:project_id}/languages/{:id}";
Languages.elementClass = language_1.Language;
//# sourceMappingURL=languages.js.map