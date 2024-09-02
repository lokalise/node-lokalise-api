import type { TranslationStatus as TranslationStatusInterface } from "../interfaces/translation_status.js";
import { BaseModel } from "./base_model.js";

export class TranslationStatus
	extends BaseModel
	implements TranslationStatusInterface
{
	declare status_id: number;
	declare title: string;
	declare color: string;
}
