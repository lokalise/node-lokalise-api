import { ProjectWithPagination } from "./project_with_pagination.js";
import type { NumericBool } from "../types/numeric_bool.js";
export interface KeyParamsWithPagination extends ProjectWithPagination {
    disable_references?: NumericBool;
    include_comments?: NumericBool;
    include_screenshots?: NumericBool;
    include_translations?: NumericBool;
    filter_translation_lang_ids?: string;
    filter_tags?: string;
    filter_filenames?: string;
    filter_keys?: string;
    filter_key_ids?: string;
    filter_platforms?: string;
    filter_untranslated?: NumericBool;
    filter_qa_issues?: string;
    filter_archived?: string;
}
