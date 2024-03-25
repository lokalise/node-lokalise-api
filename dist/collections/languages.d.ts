import { Language } from "../models/language.js";
import { BaseCollection } from "./base_collection.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { BulkResult } from "../interfaces/bulk_result.js";
import type { ProjectWithPagination, ProjectOnly, PaginationParams } from "../types/common_get_params.js";
import type { CreateLanguageParams, UpdateLanguageParams, LanguageDeleted } from "../types/languages.js";
export declare class Languages extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Language;
    system_languages(params?: PaginationParams): Promise<PaginatedResult<Language>>;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult<Language>>;
    create(raw_body: CreateLanguageParams | CreateLanguageParams[], request_params: ProjectOnly): Promise<BulkResult<Language>>;
    get(lang_id: string | number, request_params: ProjectOnly): Promise<Language>;
    update(lang_id: string | number, lang_params: UpdateLanguageParams, request_params: ProjectOnly): Promise<Language>;
    delete(lang_id: string | number, request_params: ProjectOnly): Promise<LanguageDeleted>;
}
