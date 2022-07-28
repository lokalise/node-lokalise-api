"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Branches = void 0;
const base_collection_1 = require("./base_collection");
const branch_1 = require("../models/branch");
class Branches extends base_collection_1.BaseCollection {
    static rootElementName = "branches";
    static rootElementNameSingular = "branch";
    static prefixURI = "projects/{!:project_id}/branches/{:id}";
    static elementClass = branch_1.Branch;
    list(request_params) {
        return super.doList(request_params);
    }
    create(branch_params, request_params) {
        return this.createPromise("POST", request_params, this.populateObjectFromJsonRoot, this.handleReject, branch_params);
    }
    get(branch_id, request_params) {
        return super.doGet(branch_id, request_params);
    }
    update(branch_id, branch_params, request_params) {
        const params = {
            ...request_params,
            ...{ id: branch_id },
        };
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, branch_params);
    }
    delete(branch_id, request_params) {
        return super.doDelete(branch_id, request_params);
    }
    merge(branch_id, request_params, body = {}) {
        const params = {
            ...request_params,
            ...{ id: branch_id },
        };
        return this.createPromise("POST", params, this.returnBareJSON, this.handleReject, body, "projects/{!:project_id}/branches/{:id}/merge");
    }
}
exports.Branches = Branches;
//# sourceMappingURL=branches.js.map