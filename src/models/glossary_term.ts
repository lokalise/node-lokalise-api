import type { GlossaryTerm as GlossaryTermInterface } from "../interfaces/glossary_term.js";
import { BaseModel } from "./base_model.js";

export class GlossaryTerm extends BaseModel implements GlossaryTermInterface {
	declare id: number;
	declare term: string;
	declare description: string;
	declare caseSensitive: boolean;
	declare translatable: boolean;
	declare forbidden: boolean;
	declare translations: Array<{
		langId: number;
		langName: string;
		langIso: string;
		translation: string;
		description: string;
	}>;
	declare tags: string[];
	declare createdAt: string;
	declare updatedAt: string | null;
}
