import { BaseModel } from './base_model';

export class Translation extends BaseModel {
  public  translation_id: number;
  public  key_id: number;
  public  language_iso: string;
  public  modified_at: string;
  public  modified_by: number;
  public  modified_by_email: string;
  public  translation: string;
  public  is_fuzzy: boolean;
  public  is_reviewed: boolean;
  public  words: number;
}
