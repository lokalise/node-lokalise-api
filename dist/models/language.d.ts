import { Language as LanguageInterface } from "../interfaces/language";
import { BaseModel } from "./base_model";
export declare class Language extends BaseModel implements LanguageInterface {
    lang_id: number;
    lang_iso: string;
    lang_name: string;
    is_rtl: boolean;
    plural_forms: string[];
}
