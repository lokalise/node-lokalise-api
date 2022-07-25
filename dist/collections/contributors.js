import { BaseCollection } from "./base_collection.js";
import { Contributor } from "../models/contributor.js";
export class Contributors extends BaseCollection {
    static rootElementName = "contributors";
    static rootElementNameSingular = "contributor";
    static prefixURI = "projects/{!:project_id}/contributors/{:id}";
    static elementClass = Contributor;
    create(raw_body, params) {
        const body = { contributors: this.objToArray(raw_body) };
        return this.createPromise("POST", params, this.populateArrayFromJson, this.handleReject, body, "projects/{!:project_id}/contributors");
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
//# sourceMappingURL=contributors.js.map