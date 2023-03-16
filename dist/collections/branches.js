import { BaseCollection } from "./base_collection.js";
import { Branch } from "../models/branch.js";
class Branches extends BaseCollection {
    static rootElementName = "branches";
    static rootElementNameSingular = "branch";
    static prefixURI = "projects/{!:project_id}/branches/{:id}";
    static elementClass = Branch;
    list(request_params) {
        return this.doList(request_params);
    }
    create(branch_params, request_params) {
        return this.doCreate(branch_params, request_params, this.populateObjectFromJsonRoot);
    }
    get(branch_id, request_params) {
        return this.doGet(branch_id, request_params);
    }
    update(branch_id, branch_params, request_params) {
        return this.doUpdate(branch_id, branch_params, request_params);
    }
    delete(branch_id, request_params) {
        return this.doDelete(branch_id, request_params);
    }
    merge(branch_id, request_params, body = {}) {
        const params = {
            ...request_params,
            ...{ id: branch_id },
        };
        return this.createPromise("POST", params, this.returnBareJSON, this.handleReject, body, "projects/{!:project_id}/branches/{:id}/merge");
    }
}
export { Branches };
//# sourceMappingURL=branches.js.map