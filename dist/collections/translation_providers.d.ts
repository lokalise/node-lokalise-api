import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { TranslationProvider } from "../models/translation_provider.js";
import type { TeamOnly } from "../types/common_get_params.js";
import type { TeamWithPagination } from "../types/teams.js";
import { BaseCollection } from "./base_collection.js";
export declare class TranslationProviders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof TranslationProvider;
    list(request_params: TeamWithPagination): Promise<PaginatedResult<TranslationProvider>>;
    get(provider_id: string | number, request_params: TeamOnly): Promise<TranslationProvider>;
}
