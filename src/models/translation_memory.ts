import type { TranslationMemory as TranslationMemoryInterface } from "../interfaces/translation_memory.js";
import { BaseModel } from "./base_model.js";

export class TranslationMemory
	extends BaseModel
	implements TranslationMemoryInterface
{
	declare id: number;
	declare name: string;
}
