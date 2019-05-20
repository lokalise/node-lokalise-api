"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const snapshot_1 = require("../models/snapshot");
class Snapshots extends base_collection_1.BaseCollection {
    restore(params) {
        return this.createPromise('POST', params, this.returnBareJSON, this.handleReject, {});
    }
}
Snapshots.rootElementName = 'snapshot';
Snapshots.prefixURI = 'projects/{!:project_id}/snapshots/{:id}';
Snapshots.elementClass = snapshot_1.Snapshot;
exports.Snapshots = Snapshots;
//# sourceMappingURL=snapshots.js.map
