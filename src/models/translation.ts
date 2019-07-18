import { BaseModel } from './base_model';
import { Translation as TranslationInterface } from "../interfaces";

export class Translation extends BaseModel implements TranslationInterface {
  public translation_id: number;
  public key_id: number;
  public language_iso: string;
  public modified_at: string;
  public modified_at_timestamp: number;
  public modified_by: number;
  public modified_by_email: string;
  public translation: string;
  public is_fuzzy: boolean;
  public is_reviewed: boolean;
  public reviewed_by: number;
  public words: number;
  public custom_translation_statuses: object[];
}
