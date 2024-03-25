import { BaseCollection } from "./base_collection.js";
import { TranslationStatus } from "../models/translation_status.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import type { ProjectOnly, ProjectWithPagination } from "../types/common_get_params.js";
import type { CreateTranslationStatusParams, UpdateTranslationStatusParams, TranslationStatusDeleted, TranslationStatusColors } from "../types/translation_statuses.js";
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
