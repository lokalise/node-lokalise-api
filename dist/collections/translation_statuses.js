import { BaseCollection } from "./base_collection.js";
import { TranslationStatus } from "../models/translation_status.js";
class TranslationStatuses extends BaseCollection {
    static rootElementName = "custom_translation_statuses";
    static prefixURI = "projects/{!:project_id}/custom_translation_statuses/{:id}";
    static elementClass = TranslationStatus;
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
export { TranslationStatuses };
//# sourceMappingURL=translation_statuses.js.map