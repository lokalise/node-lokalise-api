import { BaseCollection } from "./base_collection";
import { Translation } from "../models/translation";
export class Translations extends BaseCollection {
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
Translations.rootElementName = "translations";
Translations.rootElementNameSingular = "translation";
Translations.prefixURI = "projects/{!:project_id}/translations/{:id}";
Translations.elementClass = Translation;
//# sourceMappingURL=translations.js.map