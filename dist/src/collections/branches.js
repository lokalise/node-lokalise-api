import { BaseCollection } from "./base_collection";
import { Branch } from "../models/branch";
export class Branches extends BaseCollection {
    create(body, params) {
        return this.createPromise("POST", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    merge(id, params, body = {}) {
        params["id"] = id;
        return this.createPromise("POST", params, this.returnBareJSON, this.handleReject, body, "projects/{!:project_id}/branches/{:id}/merge");
    }
}
Branches.rootElementName = "branches";
Branches.rootElementNameSingular = "branch";
Branches.prefixURI = "projects/{!:project_id}/branches/{:id}";
Branches.elementClass = Branch;
//# sourceMappingURL=branches.js.map