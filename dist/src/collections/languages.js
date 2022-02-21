import { Language } from "../models/language";
import { BaseCollection } from "./base_collection";
export class Languages extends BaseCollection {
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
Languages.rootElementName = "languages";
Languages.rootElementNameSingular = "language";
Languages.prefixURI = "projects/{!:project_id}/languages/{:id}";
Languages.elementClass = Language;
//# sourceMappingURL=languages.js.map