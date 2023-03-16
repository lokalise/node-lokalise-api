import { Segment } from "../models/segment.js";
import { BaseCollection } from "./base_collection.js";
class Segments extends BaseCollection {
    static rootElementName = "segments";
    static rootElementNameSingular = "segment";
    static prefixURI = "projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";
    static elementClass = Segment;
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
export { Segments };
//# sourceMappingURL=segments.js.map