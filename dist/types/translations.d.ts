import { Keyable } from "../interfaces/keyable.js";
import type { ProjectWithPagination, ProjectOnly, CursorPagination } from "./common_get_params.js";
export type TranslationData = {
    language_iso?: string;
    translation?: string | Keyable;
    is_reviewed?: boolean;
    is_unverified?: boolean;
    custom_translation_status_ids?: string[] | number[];
};
export type UpdateTranslationParams = {
    translation: string;
    is_unverified?: boolean;
    is_reviewed?: boolean;
    custom_translation_status_ids?: string[] | number[];
};
export type ListTranslationParams = ProjectWithPagination & CursorPagination & {
    disable_references?: number | string;
    filter_lang_id?: number | string;
    filter_is_reviewed?: number | string;
    filter_unverified?: number | string;
    filter_untranslated?: number | string;
    filter_qa_issues?: string;
    filter_active_task_id?: number | string;
};
export type GetTranslationParams = ProjectOnly & {
    disable_references?: number | string;
};
