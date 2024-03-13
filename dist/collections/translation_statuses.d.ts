import { BaseCollection } from "./base_collection.js";
import { TranslationStatus } from "../models/translation_status.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { CreateTranslationStatusParams } from "../types/create_translation_status_params.js";
import { UpdateTranslationStatusParams } from "../types/update_translation_status_params.js";
type TranslationStatusDeleted = {
    project_id: string;
    custom_translation_status_deleted: boolean;
    branch?: string;
};
type TranslationStatusColors = {
    colors: string[];
};
export declare class TranslationStatuses extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof TranslationStatus;
    protected static rootElementNameSingular: string;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult<TranslationStatus>>;
    create(translation_status_params: CreateTranslationStatusParams, request_params: ProjectOnly): Promise<TranslationStatus>;
    get(translation_status_id: string | number, request_params: ProjectOnly): Promise<TranslationStatus>;
    update(translation_status_id: string | number, translation_status_params: UpdateTranslationStatusParams, request_params: ProjectOnly): Promise<TranslationStatus>;
    delete(translation_status_id: string | number, request_params: ProjectOnly): Promise<TranslationStatusDeleted>;
    available_colors(request_params: ProjectOnly): Promise<TranslationStatusColors>;
}
export {};
