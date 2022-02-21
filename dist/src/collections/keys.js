import { BaseCollection } from "./base_collection";
import { Key } from "../models/key";
export class Keys extends BaseCollection {
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
Keys.rootElementName = "keys";
Keys.rootElementNameSingular = "key";
Keys.prefixURI = "projects/{!:project_id}/keys/{:id}";
Keys.elementClass = Key;
//# sourceMappingURL=keys.js.map