"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keys = void 0;
const base_collection_1 = require("./base_collection");
const key_1 = require("../models/key");
class Keys extends base_collection_1.BaseCollection {
    static rootElementName = "keys";
    static rootElementNameSingular = "key";
    static prefixURI = "projects/{!:project_id}/keys/{:id}";
    static elementClass = key_1.Key;
    list(request_params) {
        return this.doList(request_params);
    }
    create(key_params, request_params) {
        return this.doCreate(key_params, request_params, this.populateArrayFromJsonBulk);
    }
    get(key_id, request_params) {
        return this.doGet(key_id, request_params);
    }
    update(key_id, key_params, request_params) {
        return this.doUpdate(key_id, key_params, request_params);
    }
    delete(key_id, request_params) {
        return this.doDelete(key_id, request_params);
    }
    bulk_update(key_params, request_params) {
        return this.createPromise("PUT", request_params, this.populateArrayFromJsonBulk, this.handleReject, key_params, "projects/{!:project_id}/keys");
    }
    bulk_delete(key_ids, request_params) {
        const keys = { keys: this.objToArray(key_ids) };
        return this.createPromise("DELETE", request_params, this.returnBareJSON, this.handleReject, keys, "projects/{!:project_id}/keys");
    }
}
exports.Keys = Keys;
//# sourceMappingURL=keys.js.map