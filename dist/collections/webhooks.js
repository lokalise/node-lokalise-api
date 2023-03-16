import { BaseCollection } from "./base_collection.js";
import { Webhook } from "../models/webhook.js";
class Webhooks extends BaseCollection {
    static rootElementName = "webhooks";
    static rootElementNameSingular = "webhook";
    static prefixURI = "projects/{!:project_id}/webhooks/{:id}";
    static elementClass = Webhook;
    list(request_params) {
        return this.doList(request_params);
    }
    create(webhook_params, request_params) {
        return this.doCreate(webhook_params, request_params, this.populateObjectFromJsonRoot);
    }
    get(webhook_id, request_params) {
        return this.doGet(webhook_id, request_params);
    }
    update(webhook_id, webhook_params, request_params) {
        return this.doUpdate(webhook_id, webhook_params, request_params);
    }
    delete(webhook_id, request_params) {
        return this.doDelete(webhook_id, request_params);
    }
    regenerate_secret(webhook_id, request_params) {
        const params = {
            ...request_params,
            ...{ id: webhook_id },
        };
        return this.createPromise("PATCH", params, this.returnBareJSON, this.handleReject, null, "projects/{!:project_id}/webhooks/{:id}/secret/regenerate");
    }
}
export { Webhooks };
//# sourceMappingURL=webhooks.js.map