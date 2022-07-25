import { BaseCollection } from "./base_collection.js";
import { Screenshot } from "../models/screenshot.js";
export class Screenshots extends BaseCollection {
    static rootElementName = "screenshots";
    static rootElementNameSingular = "screenshot";
    static prefixURI = "projects/{!:project_id}/screenshots/{:id}";
    static elementClass = Screenshot;
    create(raw_body, params) {
        const body = { screenshots: this.objToArray(raw_body) };
        return this.createPromise("POST", params, this.populateArrayFromJson, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
//# sourceMappingURL=screenshots.js.map