import { Segment } from "../models/segment.js";
import { BaseCollection } from "./base_collection.js";
import type { GetSegmentParams, UpdateSegmentReqParams, UpdateSegmentBodyParams, ListSegmentParams } from "../types/segments.js";
export declare class Segments extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Segment;
    list(request_params: ListSegmentParams): Promise<Segment[]>;
    get(segment_number: string | number, request_params: GetSegmentParams): Promise<Segment>;
    update(segment_number: string | number, segment_params: UpdateSegmentBodyParams, request_params: UpdateSegmentReqParams): Promise<Segment>;
}
