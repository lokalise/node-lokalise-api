import { BaseModel } from "./base_model.js";
import { Translation as TranslationInterface } from "../interfaces/translation.js";
import { TranslationStatus } from "../interfaces/translation_status.js";
export declare class Translation extends BaseModel implements TranslationInterface {
    translation_id: number;
    key_id: number;
    language_iso: string;
    modified_at: string;
    modified_at_timestamp: number;
    modified_by: number;
    modified_by_email: string;
    translation: string;
    is_unverified: boolean;
    is_reviewed: boolean;
    reviewed_by: number;
    words: number;
    custom_translation_statuses: TranslationStatus[];
    task_id: number;
    segment_number: number;
}
