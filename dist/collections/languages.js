import { Language } from "../models/language.js";
import { BaseCollection } from "./base_collection.js";
export class Languages extends BaseCollection {
    static rootElementName = "languages";
    static rootElementNameSingular = "language";
    static prefixURI = "projects/{!:project_id}/languages/{:id}";
    static elementClass = Language;
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
//# sourceMappingURL=languages.js.map