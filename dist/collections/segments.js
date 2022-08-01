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
    list(request_params) {
        return this.doList(request_params);
    }
    get(segment_number, request_params) {
        return this.doGet(segment_number, request_params);
    }
    update(segment_number, segment_params, request_params) {
        return this.doUpdate(segment_number, segment_params, request_params);
    }
}
exports.Segments = Segments;
//# sourceMappingURL=segments.js.map