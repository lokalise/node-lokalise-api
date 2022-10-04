import { BaseCollection } from "./base_collection.js";
import { TranslationProvider } from "../models/translation_provider.js";
import { TeamWithPagination } from "../interfaces/team_with_pagination.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { TeamOnly } from "../interfaces/team_only.js";
export declare class TranslationProviders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof TranslationProvider;
    list(request_params: TeamWithPagination): Promise<PaginatedResult<TranslationProvider>>;
    get(provider_id: string | number, request_params: TeamOnly): Promise<TranslationProvider>;
}
