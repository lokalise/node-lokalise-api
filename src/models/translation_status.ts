import { BaseModel } from './base_model';
import { TranslationStatus as TranslationStatusInterface } from "../interfaces";

export class TranslationStatus extends BaseModel implements TranslationStatusInterface {
  public status_id: number;
  public title: string;
  public color: string;
}