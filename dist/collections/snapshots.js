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
    list(request_params) {
        return this.doList(request_params);
    }
    create(snapshot_params, request_params) {
        return this.doCreate(snapshot_params, request_params, this.populateObjectFromJsonRoot);
    }
    restore(snapshot_id, request_params) {
        const params = {
            ...request_params,
            ...{ id: snapshot_id },
        };
        return this.createPromise("POST", params, this.returnBareJSON, this.handleReject, {});
    }
    delete(snapshot_id, request_params) {
        return this.doDelete(snapshot_id, request_params);
    }
}
exports.Snapshots = Snapshots;
//# sourceMappingURL=snapshots.js.map