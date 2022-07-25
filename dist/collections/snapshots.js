import { BaseCollection } from "./base_collection.js";
import { Snapshot } from "../models/snapshot.js";
export class Snapshots extends BaseCollection {
    static rootElementName = "snapshots";
    static rootElementNameSingular = "snapshot";
    static prefixURI = "projects/{!:project_id}/snapshots/{:id}";
    static elementClass = Snapshot;
    restore(id, params) {
        params["id"] = id;
        return this.createPromise("POST", params, this.returnBareJSON, this.handleReject, {});
    }
    create(body, params) {
        return this.createPromise("POST", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
//# sourceMappingURL=snapshots.js.map