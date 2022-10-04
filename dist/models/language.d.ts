import { Language as LanguageInterface } from "../interfaces/language.js";
import { BaseModel } from "./base_model.js";
export declare class Language extends BaseModel implements LanguageInterface {
    lang_id: number;
    lang_iso: string;
    lang_name: string;
    is_rtl: boolean;
    plural_forms: string[];
}
