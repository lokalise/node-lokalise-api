import { BaseModel } from "./base_model";
import { Segment as SegmentInterface } from "../interfaces/segment";
import { TranslationStatus } from "./translation_status";
export declare class Segment extends BaseModel implements SegmentInterface {
    segment_number: number;
    language_iso: string;
    modified_at: string;
    modified_at_timestamp: number;
    modified_by: number;
    modified_by_email: string;
    value: string;
    is_fuzzy: boolean;
    is_reviewed: boolean;
    reviewed_by: number;
    words: number;
    custom_translation_statuses: TranslationStatus[];
}
