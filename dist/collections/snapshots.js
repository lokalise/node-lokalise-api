import { BaseCollection } from "./base_collection.js";
import { Snapshot } from "../models/snapshot.js";
class Snapshots extends BaseCollection {
    static rootElementName = "snapshots";
    static rootElementNameSingular = "snapshot";
    static prefixURI = "projects/{!:project_id}/snapshots/{:id}";
    static elementClass = Snapshot;
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
export { Snapshots };
//# sourceMappingURL=snapshots.js.map