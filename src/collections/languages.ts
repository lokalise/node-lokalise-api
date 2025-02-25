import type { BulkResult } from "../interfaces/bulk_result.js";
import type { Keyable } from "../interfaces/keyable.js";
import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Language } from "../models/language.js";
import type {
	PaginationParams,
	ProjectOnly,
	ProjectWithPagination,
} from "../types/common_get_params.js";
import type {
	CreateLanguageParams,
	LanguageDeleted,
	UpdateLanguageParams,
} from "../types/languages.js";
import { BaseCollection } from "./base_collection.js";

export class Languages extends BaseCollection<Language> {
	protected static override prefixURI =
		"projects/{!:project_id}/languages/{:id}";

	protected get elementClass(): new (
		json: Keyable,
	) => Language {
		return Language;
	}

	protected override get rootElementName(): string {
		return "languages";
	}

	protected override get rootElementNameSingular(): string | null {
		return "language";
	}

	system_languages(
		params: PaginationParams = {},
	): Promise<PaginatedResult<Language>> {
		return this.createPromise(
			"GET",
			params,
			this.populateArrayFromJson,
			null,
			"system/languages",
		) as Promise<PaginatedResult<Language>>;
	}

	list(
		request_params: ProjectWithPagination,
	): Promise<PaginatedResult<Language>> {
		return this.doList(request_params) as Promise<PaginatedResult<Language>>;
	}

	create(
		raw_body: CreateLanguageParams | CreateLanguageParams[],
		request_params: ProjectOnly,
	): Promise<BulkResult<Language>> {
		const body = { languages: this.objToArray(raw_body) };

		return this.createPromise(
			"POST",
			request_params,
			this.populateArrayFromJsonBulk,
			body,
		);
	}

	get(
		lang_id: string | number,
		request_params: ProjectOnly,
	): Promise<Language> {
		return this.doGet(lang_id, request_params);
	}

	update(
		lang_id: string | number,
		lang_params: UpdateLanguageParams,
		request_params: ProjectOnly,
	): Promise<Language> {
		return this.doUpdate(lang_id, lang_params, request_params);
	}

	delete(
		lang_id: string | number,
		request_params: ProjectOnly,
	): Promise<LanguageDeleted> {
		return super.doDelete(lang_id, request_params);
	}
}
