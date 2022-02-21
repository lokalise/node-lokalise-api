import { BaseCollection } from "./base_collection";
import { Webhook } from "../models/webhook";
export class Webhooks extends BaseCollection {
    create(body, params) {
        return this.createPromise("POST", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    regenerate_secret(id, params) {
        params["id"] = id;
        return this.createPromise("PATCH", params, this.returnBareJSON, this.handleReject, null, "projects/{!:project_id}/webhooks/{:id}/secret/regenerate");
    }
}
Webhooks.rootElementName = "webhooks";
Webhooks.rootElementNameSingular = "webhook";
Webhooks.prefixURI = "projects/{!:project_id}/webhooks/{:id}";
Webhooks.elementClass = Webhook;
//# sourceMappingURL=webhooks.js.map