import { BaseCollection } from "./base_collection";
import { TranslationStatus } from "../models/translation_status";
export class TranslationStatuses extends BaseCollection {
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
TranslationStatuses.rootElementName = "custom_translation_statuses";
TranslationStatuses.prefixURI = "projects/{!:project_id}/custom_translation_statuses/{:id}";
TranslationStatuses.elementClass = TranslationStatus;
TranslationStatuses.rootElementNameSingular = "custom_translation_status";
//# sourceMappingURL=translation_statuses.js.map