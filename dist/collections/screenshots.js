"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Screenshots = void 0;
const base_collection_1 = require("./base_collection");
const screenshot_1 = require("../models/screenshot");
class Screenshots extends base_collection_1.BaseCollection {
    static rootElementName = "screenshots";
    static rootElementNameSingular = "screenshot";
    static prefixURI = "projects/{!:project_id}/screenshots/{:id}";
    static elementClass = screenshot_1.Screenshot;
    create(raw_body, params) {
        const body = { screenshots: this.objToArray(raw_body) };
        return this.createPromise("POST", params, this.populateArrayFromJsonBulk, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
exports.Screenshots = Screenshots;
//# sourceMappingURL=screenshots.js.map