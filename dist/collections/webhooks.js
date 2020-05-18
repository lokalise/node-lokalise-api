"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webhooks = void 0;
const base_collection_1 = require("./base_collection");
const webhook_1 = require("../models/webhook");
let Webhooks = /** @class */ (() => {
    class Webhooks extends base_collection_1.BaseCollection {
        create(body, params = {}) {
            return this.createPromise("POST", params, this.populateObjectFromJsonRoot, this.handleReject, body);
        }
        update(id, body, params = {}) {
            params["id"] = id;
            return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
        }
        regenerate_secret(id, params = {}) {
            params["id"] = id;
            return this.createPromise("PATCH", params, this.returnBareJSON, this.handleReject, null, "projects/{!:project_id}/webhooks/{:id}/secret/regenerate");
        }
    }
    Webhooks.rootElementName = "webhooks";
    Webhooks.rootElementNameSingular = "webhook";
    Webhooks.prefixURI = "projects/{!:project_id}/webhooks/{:id}";
    Webhooks.elementClass = webhook_1.Webhook;
    return Webhooks;
})();
exports.Webhooks = Webhooks;
//# sourceMappingURL=webhooks.js.map