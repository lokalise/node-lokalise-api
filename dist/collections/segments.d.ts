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
export declare class Segments extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Segment;
    list(request_params: ListSegmentParams): Promise<Segment[]>;
    get(segment_number: string | number, request_params: GetSegmentParams): Promise<Segment>;
    update(segment_number: string | number, segment_params: UpdateSegmentBodyParams, request_params: UpdateSegmentReqParams): Promise<any>;
}
export {};
