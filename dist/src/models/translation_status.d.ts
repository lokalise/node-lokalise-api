import { BaseModel } from "./base_model";
import { TranslationStatus as TranslationStatusInterface } from "../interfaces/translation_status";
export declare class TranslationStatus extends BaseModel implements TranslationStatusInterface {
    status_id: number;
    title: string;
    color: string;
}
