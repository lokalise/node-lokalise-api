"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const branch_1 = require("../models/branch");
class Branches extends base_collection_1.BaseCollection {
    create(body, params = {}) {
        return this.createPromise('POST', params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    update(id, body, params = {}) {
        params['id'] = id;
        return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
exports.Branches = Branches;
Branches.rootElementName = 'branches';
Branches.rootElementNameSingular = 'branch';
Branches.prefixURI = 'projects/{!:project_id}/branches/{:id}';
Branches.elementClass = branch_1.Branch;
//# sourceMappingURL=branches.js.map