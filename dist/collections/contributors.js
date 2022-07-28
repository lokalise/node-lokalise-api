"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contributors = void 0;
const base_collection_1 = require("./base_collection");
const contributor_1 = require("../models/contributor");
class Contributors extends base_collection_1.BaseCollection {
    static rootElementName = "contributors";
    static rootElementNameSingular = "contributor";
    static prefixURI = "projects/{!:project_id}/contributors/{:id}";
    static elementClass = contributor_1.Contributor;
    list(request_params) {
        return super.doList(request_params);
    }
    create(contributor_params, request_params) {
        const body = { contributors: this.objToArray(contributor_params) };
        return this.createPromise("POST", request_params, this.populateArrayFromJson, this.handleReject, body, "projects/{!:project_id}/contributors");
    }
    get(contributor_id, request_params) {
        return super.doGet(contributor_id, request_params);
    }
    update(contributor_id, contributor_params, request_params) {
        const params = {
            ...request_params,
            ...{ id: contributor_id },
        };
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, contributor_params);
    }
    delete(contributor_id, request_params) {
        return super.doDelete(contributor_id, request_params);
    }
}
exports.Contributors = Contributors;
//# sourceMappingURL=contributors.js.map