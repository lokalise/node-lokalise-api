"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const screenshot_1 = require("../models/screenshot");
class Screenshots extends base_collection_1.BaseCollection {
    create(raw_body, params = {}) {
        const body = { "screenshots": raw_body };
        return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body);
    }
    update(id, body, params = {}) {
        params['id'] = id;
        return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
Screenshots.rootElementName = 'screenshots';
Screenshots.rootElementNameSingular = 'screenshot';
Screenshots.prefixURI = 'projects/{!:project_id}/screenshots/{:id}';
Screenshots.elementClass = screenshot_1.Screenshot;
exports.Screenshots = Screenshots;
//# sourceMappingURL=screenshots.js.map