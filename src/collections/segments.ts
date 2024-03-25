import { Segment } from "../models/segment.js";
import { BaseCollection } from "./base_collection.js";
import type {
  GetSegmentParams,
  UpdateSegmentReqParams,
  UpdateSegmentBodyParams,
  ListSegmentParams,
} from "../types/segments.js";

export class Segments extends BaseCollection {
  protected static rootElementName = "segments";
  protected static rootElementNameSingular = "segment";
  protected static prefixURI =
    "projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";
  protected static elementClass = Segment;

  list(request_params: ListSegmentParams): Promise<Segment[]> {
    return this.doList(request_params);
  }

  get(
    segment_number: string | number,
    request_params: GetSegmentParams,
  ): Promise<Segment> {
    return this.doGet(segment_number, request_params);
  }

  update(
    segment_number: string | number,
    segment_params: UpdateSegmentBodyParams,
    request_params: UpdateSegmentReqParams,
  ): Promise<Segment> {
    return this.doUpdate(segment_number, segment_params, request_params);
  }
}
