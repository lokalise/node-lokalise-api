"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contributors = void 0;
const base_collection_1 = require("./base_collection");
const contributor_1 = require("../models/contributor");
class Contributors extends base_collection_1.BaseCollection {
    create(raw_body, params) {
        const body = { contributors: this.objToArray(raw_body) };
        return this.createPromise("POST", params, this.populateArrayFromJson, this.handleReject, body, "projects/{!:project_id}/contributors");
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
exports.Contributors = Contributors;
Contributors.rootElementName = "contributors";
Contributors.rootElementNameSingular = "contributor";
Contributors.prefixURI = "projects/{!:project_id}/contributors/{:id}";
Contributors.elementClass = contributor_1.Contributor;
//# sourceMappingURL=contributors.js.map