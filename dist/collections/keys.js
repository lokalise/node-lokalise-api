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
    create(raw_body, params) {
        const body = { keys: this.objToArray(raw_body) };
        return this.createPromise("POST", params, this.populateArrayFromJson, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    bulk_update(raw_keys, params) {
        const keys = { keys: this.objToArray(raw_keys) };
        return this.createPromise("PUT", params, this.populateArrayFromJson, this.handleReject, keys, "projects/{!:project_id}/keys");
    }
    bulk_delete(raw_keys, params) {
        const keys = { keys: this.objToArray(raw_keys) };
        return this.createPromise("DELETE", params, this.returnBareJSON, this.handleReject, keys, "projects/{!:project_id}/keys");
    }
}
exports.Keys = Keys;
//# sourceMappingURL=keys.js.map