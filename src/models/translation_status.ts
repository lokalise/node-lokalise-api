import { BaseModel } from "./base_model";
import { TranslationStatus as TranslationStatusInterface } from "../interfaces/translation_status";

export class TranslationStatus
  extends BaseModel
  implements TranslationStatusInterface
{
  declare status_id: number;
  declare title: string;
  declare color: string;
}
