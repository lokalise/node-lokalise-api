import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';

export class Translations extends BaseModel {
  protected static rootElementName:string = 'translations';
  protected static prefixURI:string = 'projects/{!:project_id}/translations/{:id}';
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
