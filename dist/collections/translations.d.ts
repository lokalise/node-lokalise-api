import { BaseCollection } from "./base_collection.js";
import { Translation } from "../models/translation.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
interface ListTranslationParams extends ProjectWithPagination {
    disable_references?: number | string;
    filter_lang_id?: number | string;
    filter_is_reviewed?: number | string;
    filter_unverified?: number | string;
    filter_untranslated?: number | string;
    filter_qa_issues?: string;
    filter_active_task_id?: number | string;
}
interface GetTranslationParams extends ProjectOnly {
    disable_references?: number | string;
}
type TranslationParams = {
    translation: string;
    is_unverified?: boolean;
    is_reviewed?: boolean;
    custom_translation_status_ids?: string[] | number[];
};
export declare class Translations extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Translation;
    list(request_params: ListTranslationParams): Promise<PaginatedResult<Translation>>;
    get(translation_id: string | number, request_params: GetTranslationParams): Promise<Translation>;
    update(translation_id: string | number, translation_params: TranslationParams, request_params: ProjectOnly): Promise<Translation>;
}
export {};
