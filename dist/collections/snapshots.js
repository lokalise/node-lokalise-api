"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snapshots = void 0;
const base_collection_1 = require("./base_collection");
const snapshot_1 = require("../models/snapshot");
class Snapshots extends base_collection_1.BaseCollection {
    static rootElementName = "snapshots";
    static rootElementNameSingular = "snapshot";
    static prefixURI = "projects/{!:project_id}/snapshots/{:id}";
    static elementClass = snapshot_1.Snapshot;
    restore(id, params) {
        params["id"] = id;
        return this.createPromise("POST", params, this.returnBareJSON, this.handleReject, {});
    }
    create(body, params) {
        return this.createPromise("POST", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
exports.Snapshots = Snapshots;
//# sourceMappingURL=snapshots.js.map