import { BaseCollection } from "./base_collection";
import { Contributor } from "../models/contributor";
export class Contributors extends BaseCollection {
    create(raw_body, params) {
        const body = { contributors: this.objToArray(raw_body) };
        return this.createPromise("POST", params, this.populateArrayFromJson, this.handleReject, body, "projects/{!:project_id}/contributors");
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
Contributors.rootElementName = "contributors";
Contributors.rootElementNameSingular = "contributor";
Contributors.prefixURI = "projects/{!:project_id}/contributors/{:id}";
Contributors.elementClass = Contributor;
//# sourceMappingURL=contributors.js.map