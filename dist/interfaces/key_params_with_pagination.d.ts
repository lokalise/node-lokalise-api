import { ProjectWithPagination } from "./project_with_pagination.js";
export interface KeyParamsWithPagination extends ProjectWithPagination {
    disable_references?: number;
    include_comments?: number;
    include_screenshots?: number;
    include_translations?: number;
    filter_translation_lang_ids?: string;
    filter_tags?: string;
    filter_filenames?: string;
    filter_keys?: string;
    filter_key_ids?: string;
    filter_platforms?: string;
    filter_untranslated?: number;
    filter_qa_issues?: string;
    filter_archived?: string;
}
