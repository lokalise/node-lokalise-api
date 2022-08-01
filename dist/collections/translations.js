"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translations = void 0;
const base_collection_1 = require("./base_collection");
const translation_1 = require("../models/translation");
class Translations extends base_collection_1.BaseCollection {
    static rootElementName = "translations";
    static rootElementNameSingular = "translation";
    static prefixURI = "projects/{!:project_id}/translations/{:id}";
    static elementClass = translation_1.Translation;
    list(request_params) {
        return this.doList(request_params);
    }
    get(translation_id, request_params) {
        return this.doGet(translation_id, request_params);
    }
    update(translation_id, translation_params, request_params) {
        return this.doUpdate(translation_id, translation_params, request_params);
    }
}
exports.Translations = Translations;
//# sourceMappingURL=translations.js.map