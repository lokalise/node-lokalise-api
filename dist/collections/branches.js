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
exports.Branches = Branches;
//# sourceMappingURL=branches.js.map