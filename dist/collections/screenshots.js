"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const screenshot_1 = require("../models/screenshot");
class Screenshots extends base_collection_1.BaseCollection {
}
Screenshots.rootElementName = 'screenshots';
Screenshots.prefixURI = 'projects/{!:project_id}/screenshots/{:id}';
Screenshots.elementClass = screenshot_1.Screenshot;
exports.Screenshots = Screenshots;
//# sourceMappingURL=screenshots.js.map