import { TranslationMemory } from "../models/translation_memory.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";

export class TranslationMemories extends BaseCollection<TranslationMemory> {
	protected static override prefixURI =
		"projects/{!:project_id}/translation-memories";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => TranslationMemory {
		return TranslationMemory;
	}

	protected override get rootElementName(): string {
		return "translation_memories";
	}

	list(request_params: ProjectOnly): Promise<TranslationMemory[]> {
		return this.doList(request_params) as Promise<TranslationMemory[]>;
	}
}
