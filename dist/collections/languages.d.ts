import { Language } from "../models/language";
import { BaseCollection } from "./base_collection";
import { PaginatedResult } from "../interfaces/paginated_result";
import { CreateLanguageData } from "../types/create_language_data";
import { UpdateLanguageData } from "../types/update_language_data";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";
import { ProjectOnly } from "../interfaces/project_only";
import { BulkResult } from "../interfaces/bulk_result";
import { PaginationParams } from "../interfaces/pagination_params";
declare type LanguageDeleted = {
    project_id: string;
    language_deleted: boolean;
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
