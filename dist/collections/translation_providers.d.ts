import { BaseCollection } from "./base_collection";
import { TranslationProvider } from "../models/translation_provider";
import { TeamWithPagination } from "../interfaces/team_with_pagination";
import { PaginatedResult } from "../interfaces/paginated_result";
import { TeamOnly } from "../interfaces/team_only";
export declare class TranslationProviders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof TranslationProvider;
    list(request_params: TeamWithPagination): Promise<PaginatedResult<TranslationProvider>>;
    get(provider_id: string | number, request_params: TeamOnly): Promise<TranslationProvider>;
}
