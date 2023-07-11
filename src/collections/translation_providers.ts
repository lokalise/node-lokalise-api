import { BaseCollection } from "./base_collection.js";
import { TranslationProvider } from "../models/translation_provider.js";
import { TeamWithPagination } from "../interfaces/team_with_pagination.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { TeamOnly } from "../interfaces/team_only.js";

export class TranslationProviders extends BaseCollection {
  protected static rootElementName = "translation_providers";
  protected static prefixURI = "teams/{!:team_id}/translation_providers/{:id}";
  protected static elementClass = TranslationProvider;

  list(
    request_params: TeamWithPagination,
  ): Promise<PaginatedResult<TranslationProvider>> {
    return this.doList(request_params);
  }

  get(
    provider_id: string | number,
    request_params: TeamOnly,
  ): Promise<TranslationProvider> {
    return this.doGet(provider_id, request_params);
  }
}
