import { BaseCollection } from "./base_collection";
import { Snapshot } from "../models/snapshot";
export class Snapshots extends BaseCollection {
    restore(id, params) {
        params["id"] = id;
        return this.createPromise("POST", params, this.returnBareJSON, this.handleReject, {});
    }
    create(body, params) {
        return this.createPromise("POST", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
Snapshots.rootElementName = "snapshots";
Snapshots.rootElementNameSingular = "snapshot";
Snapshots.prefixURI = "projects/{!:project_id}/snapshots/{:id}";
Snapshots.elementClass = Snapshot;
//# sourceMappingURL=snapshots.js.map