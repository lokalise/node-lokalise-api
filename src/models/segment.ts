import { BaseModel } from "./base_model.js";
import { Segment as SegmentInterface } from "../interfaces/segment.js";
import { TranslationStatus } from "./translation_status.js";

export class Segment extends BaseModel implements SegmentInterface {
  declare segment_number: number;
  declare language_iso: string;
  declare modified_at: string;
  declare modified_at_timestamp: number;
  declare modified_by: number;
  declare modified_by_email: string;
  declare value: string;
  declare is_fuzzy: boolean;
  declare is_reviewed: boolean;
  declare reviewed_by: number;
  declare words: number;
  declare custom_translation_statuses: TranslationStatus[];
}
