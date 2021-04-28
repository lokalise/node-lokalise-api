import { BaseModel } from "./base_model";
import { Translation as TranslationInterface } from "../interfaces/translation";
export declare class Translation extends BaseModel implements TranslationInterface {
    translation_id: number;
    key_id: number;
    language_iso: string;
    modified_at: string;
    modified_at_timestamp: number;
    modified_by: number;
    modified_by_email: string;
    translation: string;
    is_fuzzy: boolean;
    is_reviewed: boolean;
    reviewed_by: number;
    words: number;
    custom_translation_statuses: object[];
    task_id: number;
}
