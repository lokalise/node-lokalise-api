import type { CursorPaginatedResult } from "../interfaces/cursor_paginated_result.js";
import { Translation } from "../models/translation.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type {
	GetTranslationParams,
	ListTranslationParams,
	UpdateTranslationParams,
} from "../types/translations.js";
import { BaseCollection } from "./base_collection.js";

export class Translations extends BaseCollection<Translation> {
	protected static override prefixURI =
		"projects/{!:project_id}/translations/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => Translation {
		return Translation;
	}

	protected override get rootElementName(): string {
		return "translations";
	}

	protected override get rootElementNameSingular(): string | null {
		return "translation";
	}

	list(
		request_params: ListTranslationParams,
	): Promise<CursorPaginatedResult<Translation>> {
		return this.doListCursor(request_params);
	}

	get(
		translation_id: string | number,
		request_params: GetTranslationParams,
	): Promise<Translation> {
		return this.doGet(translation_id, request_params);
	}

	update(
		translation_id: string | number,
		translation_params: UpdateTranslationParams,
		request_params: ProjectOnly,
	): Promise<Translation> {
		return this.doUpdate(translation_id, translation_params, request_params);
	}
}
