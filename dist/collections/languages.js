import { Language } from "../models/language.js";
import { BaseCollection } from "./base_collection.js";
class Languages extends BaseCollection {
    static rootElementName = "languages";
    static rootElementNameSingular = "language";
    static prefixURI = "projects/{!:project_id}/languages/{:id}";
    static elementClass = Language;
    system_languages(params = {}) {
        return this.createPromise("GET", params, this.populateArrayFromJson, this.handleReject, null, "system/languages");
    }
    list(request_params) {
        return this.doList(request_params);
    }
    create(raw_body, request_params) {
        const body = { languages: this.objToArray(raw_body) };
        return this.doCreate(body, request_params, this.populateArrayFromJsonBulk);
    }
    get(lang_id, request_params) {
        return this.doGet(lang_id, request_params);
    }
    update(lang_id, lang_params, request_params) {
        return this.doUpdate(lang_id, lang_params, request_params);
    }
    delete(lang_id, request_params) {
        return super.doDelete(lang_id, request_params);
    }
}
export { Languages };
//# sourceMappingURL=languages.js.map