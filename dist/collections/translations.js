import { Translation } from "../models/translation.js";
import { BaseCollection } from "./base_collection.js";
export class Translations extends BaseCollection {
    static rootElementName = "translations";
    static rootElementNameSingular = "translation";
    static prefixURI = "projects/{!:project_id}/translations/{:id}";
    static elementClass = Translation;
    list(request_params) {
        return this.doListCursor(request_params);
    }
    get(translation_id, request_params) {
        return this.doGet(translation_id, request_params);
    }
    update(translation_id, translation_params, request_params) {
        return this.doUpdate(translation_id, translation_params, request_params);
    }
}
//# sourceMappingURL=translations.js.map