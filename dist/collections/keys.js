"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const key_1 = require("../models/key");
class Keys extends base_collection_1.BaseCollection {
    create(body, params = {}) {
        return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body);
    }
    bulk_update(keys, params) {
        return this.createPromise('PUT', params, this.returnBareJSON, this.handleReject, keys, 'projects/{!:project_id}/keys');
    }
    bulk_delete(keys, params) {
        return this.createPromise('DELETE', params, this.returnBareJSON, this.handleReject, keys, 'projects/{!:project_id}/keys');
    }
}
Keys.rootElementName = 'keys';
Keys.prefixURI = 'projects/{!:project_id}/keys/{:id}';
Keys.elementClass = key_1.Key;
exports.Keys = Keys;
//# sourceMappingURL=keys.js.map