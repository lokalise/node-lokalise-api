import { BaseCollection } from "./base_collection.js";
import { Translation } from "../models/translation.js";
class Translations extends BaseCollection {
    static rootElementName = "translations";
    static rootElementNameSingular = "translation";
    static prefixURI = "projects/{!:project_id}/translations/{:id}";
    static elementClass = Translation;
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
export { Translations };
//# sourceMappingURL=translations.js.map