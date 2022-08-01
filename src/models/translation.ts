import { BaseModel } from "./base_model";
import { Translation as TranslationInterface } from "../interfaces/translation";
import { TranslationStatus } from "../interfaces/translation_status";

export class Translation extends BaseModel implements TranslationInterface {
  declare translation_id: number;
  declare key_id: number;
  declare language_iso: string;
  declare modified_at: string;
  declare modified_at_timestamp: number;
  declare modified_by: number;
  declare modified_by_email: string;
  declare translation: string;
  declare is_unverified: boolean;
  declare is_reviewed: boolean;
  declare reviewed_by: number;
  declare words: number;
  declare custom_translation_statuses: TranslationStatus[];
  declare task_id: number;
  declare segment_number: number;
}
