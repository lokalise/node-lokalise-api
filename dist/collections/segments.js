"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Segments = void 0;
const segment_1 = require("../models/segment");
const base_collection_1 = require("./base_collection");
class Segments extends base_collection_1.BaseCollection {
    static rootElementName = "segments";
    static rootElementNameSingular = "segment";
    static prefixURI = "projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";
    static elementClass = segment_1.Segment;
    update(id, body, params = {}) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
exports.Segments = Segments;
//# sourceMappingURL=segments.js.map