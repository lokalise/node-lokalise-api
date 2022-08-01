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
    list(request_params) {
        return this.doList(request_params);
    }
    create(raw_body, request_params) {
        const body = { screenshots: this.objToArray(raw_body) };
        return this.doCreate(body, request_params, this.populateArrayFromJsonBulk);
    }
    get(screnshot_id, request_params) {
        return this.doGet(screnshot_id, request_params);
    }
    update(screenshot_id, screenshot_params, request_params) {
        return this.doUpdate(screenshot_id, screenshot_params, request_params);
    }
    delete(screenshot_id, request_params) {
        return this.doDelete(screenshot_id, request_params);
    }
}
exports.Screenshots = Screenshots;
//# sourceMappingURL=screenshots.js.map