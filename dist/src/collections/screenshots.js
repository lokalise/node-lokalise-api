import { BaseCollection } from "./base_collection";
import { Screenshot } from "../models/screenshot";
export class Screenshots extends BaseCollection {
    create(raw_body, params) {
        const body = { screenshots: this.objToArray(raw_body) };
        return this.createPromise("POST", params, this.populateArrayFromJson, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
Screenshots.rootElementName = "screenshots";
Screenshots.rootElementNameSingular = "screenshot";
Screenshots.prefixURI = "projects/{!:project_id}/screenshots/{:id}";
Screenshots.elementClass = Screenshot;
//# sourceMappingURL=screenshots.js.map