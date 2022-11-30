import { Language } from "../models/language.js";
import { BaseCollection } from "./base_collection.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { BulkResult } from "../interfaces/bulk_result.js";
import { PaginationParams } from "../interfaces/pagination_params.js";
type LanguageDeleted = {
    project_id: string;
    language_deleted: boolean;
};
type CreateLanguageData = {
    lang_iso: string;
    custom_iso?: string;
    custom_name?: string;
    custom_plural_forms?: string[];
};
type UpdateLanguageData = {
    lang_iso?: string;
    lang_name?: string;
    plural_forms?: string[];
};
export declare class Languages extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Language;
    system_languages(params?: PaginationParams): Promise<PaginatedResult<Language>>;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult<Language>>;
    create(raw_body: CreateLanguageData | CreateLanguageData[], request_params: ProjectOnly): Promise<BulkResult<Language>>;
    get(lang_id: string | number, request_params: ProjectOnly): Promise<Language>;
    update(lang_id: string | number, lang_params: UpdateLanguageData, request_params: ProjectOnly): Promise<Language>;
    delete(lang_id: string | number, request_params: ProjectOnly): Promise<LanguageDeleted>;
}
export {};
