import { Segment } from "../models/segment.js";
import { BaseCollection } from "./base_collection.js";
import { ProjectOnly } from "../interfaces/project_only.js";

interface GetSegmentParams extends ProjectOnly {
  key_id: number | string;
  language_iso: string;
  disable_references?: number | string;
}

type UpdateSegmentReqParams = Omit<GetSegmentParams, "disable_references">;

type UpdateSegmentBodyParams = {
  value: string;
  is_fuzzy?: boolean;
  is_reviewed?: boolean;
  custom_translation_status_ids?: string[] | number[];
};

interface ListSegmentParams extends GetSegmentParams {
  filter_is_reviewed?: number | string;
  filter_unverified?: number | string;
  filter_untranslated?: number | string;
  filter_qa_issues?: string;
}

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
  ): Promise<any> {
    return this.doUpdate(segment_number, segment_params, request_params);
  }
}
