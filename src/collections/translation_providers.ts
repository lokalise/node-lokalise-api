import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { TranslationProvider } from "../models/translation_provider.js";
import type { TeamOnly } from "../types/common_get_params.js";
import type { TeamWithPagination } from "../types/teams.js";
import { BaseCollection } from "./base_collection.js";

export class TranslationProviders extends BaseCollection<TranslationProvider> {
	protected static override prefixURI =
		"teams/{!:team_id}/translation_providers/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => TranslationProvider {
		return TranslationProvider;
	}

	protected override get rootElementName(): string {
		return "translation_providers";
	}

	protected override get rootElementNameSingular(): string | null {
		return null;
	}

	list(
		request_params: TeamWithPagination,
	): Promise<PaginatedResult<TranslationProvider>> {
		return this.doList(request_params) as Promise<
			PaginatedResult<TranslationProvider>
		>;
	}

	get(
		provider_id: string | number,
		request_params: TeamOnly,
	): Promise<TranslationProvider> {
		return this.doGet(provider_id, request_params);
	}
}
