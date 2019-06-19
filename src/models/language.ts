import { Language as LanguageInterface } from "../interfaces";
import { BaseModel } from './base_model';

export class Language extends BaseModel implements LanguageInterface {
  public lang_id: number;
  public lang_iso: string;
  public lang_name: string;
  public is_rtl: boolean;
  public plural_forms: string[];
}
