"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const contributor_1 = require("../models/contributor");
class Contributors extends base_collection_1.BaseCollection {
    create(raw_body, params = {}) {
        const body = { 'contributors': raw_body };
        return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body, 'projects/{!:project_id}/contributors');
    }
    update(id, body, params = {}) {
        params['id'] = id;
        return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
Contributors.rootElementName = 'contributors';
Contributors.rootElementNameSingular = 'contributor';
Contributors.prefixURI = 'projects/{!:project_id}/contributors/{:id}';
Contributors.elementClass = contributor_1.Contributor;
exports.Contributors = Contributors;
//# sourceMappingURL=contributors.js.map