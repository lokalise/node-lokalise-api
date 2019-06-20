"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const key_1 = require("../models/key");
class Keys extends base_collection_1.BaseCollection {
    create(raw_body, params = {}) {
        const body = { 'keys': raw_body };
        return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body);
    }
    update(id, body, params = {}) {
        params['id'] = id;
        return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    bulk_update(raw_keys, params) {
        const keys = { 'keys': raw_keys };
        return this.createPromise('PUT', params, this.populateArrayFromJson, this.handleReject, keys, 'projects/{!:project_id}/keys');
    }
    bulk_delete(raw_keys, params) {
        const keys = { 'keys': raw_keys };
        return this.createPromise('DELETE', params, this.returnBareJSON, this.handleReject, keys, 'projects/{!:project_id}/keys');
    }
}
Keys.rootElementName = 'keys';
Keys.rootElementNameSingular = 'key';
Keys.prefixURI = 'projects/{!:project_id}/keys/{:id}';
Keys.elementClass = key_1.Key;
exports.Keys = Keys;
//# sourceMappingURL=keys.js.map