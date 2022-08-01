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
    list(request_params) {
        return this.doList(request_params);
    }
    create(translation_status_params, request_params) {
        return this.doCreate(translation_status_params, request_params, this.populateObjectFromJsonRoot);
    }
    get(translation_status_id, request_params) {
        return this.doGet(translation_status_id, request_params);
    }
    update(translation_status_id, translation_status_params, request_params) {
        return this.doUpdate(translation_status_id, translation_status_params, request_params);
    }
    delete(translation_status_id, request_params) {
        return this.doDelete(translation_status_id, request_params);
    }
    available_colors(request_params) {
        return this.createPromise("GET", request_params, this.returnBareJSON, this.handleReject, {}, "projects/{!:project_id}/custom_translation_statuses/colors");
    }
}
exports.TranslationStatuses = TranslationStatuses;
//# sourceMappingURL=translation_statuses.js.map