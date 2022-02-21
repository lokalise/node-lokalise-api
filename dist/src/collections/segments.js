import { Segment as SegmentModel } from "../models/segment";
import { BaseCollection } from "./base_collection";
export class Segments extends BaseCollection {
    update(id, body, params = {}) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
Segments.rootElementName = "segments";
Segments.rootElementNameSingular = "segment";
Segments.prefixURI = "projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";
Segments.elementClass = SegmentModel;
//# sourceMappingURL=segments.js.map