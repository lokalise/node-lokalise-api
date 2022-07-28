"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationStatuses = void 0;
const base_collection_1 = require("./base_collection");
const translation_status_1 = require("../models/translation_status");
class TranslationStatuses extends base_collection_1.BaseCollection {
    static rootElementName = "custom_translation_statuses";
    static prefixURI = "projects/{!:project_id}/custom_translation_statuses/{:id}";
    static elementClass = translation_status_1.TranslationStatus;
    static rootElementNameSingular = "custom_translation_status";
    create(body, params) {
        return this.createPromise("POST", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    available_colors(params) {
        return this.createPromise("GET", params, this.returnBareJSON, this.handleReject, {}, "projects/{!:project_id}/custom_translation_statuses/colors");
    }
}
exports.TranslationStatuses = TranslationStatuses;
//# sourceMappingURL=translation_statuses.js.map