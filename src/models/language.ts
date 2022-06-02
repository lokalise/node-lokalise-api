import { Language as LanguageInterface } from "../interfaces/language";
import { BaseModel } from "./base_model";

export class Language extends BaseModel implements LanguageInterface {
  declare lang_id: number;
  declare lang_iso: string;
  declare lang_name: string;
  declare is_rtl: boolean;
  declare plural_forms: string[];
}
