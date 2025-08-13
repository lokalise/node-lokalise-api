import type { Language as LanguageInterface } from "../interfaces/language.js";
import { BaseModel } from "./base_model.js";

export class Language extends BaseModel implements LanguageInterface {
	declare lang_id: number;
	declare lang_iso: string;
	declare lang_name: string;
	declare is_rtl: boolean;
	declare plural_forms: string[];
	declare project_language_uuid?: string;
}
