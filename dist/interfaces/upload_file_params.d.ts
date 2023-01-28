import type { FileFormat } from "../types/file_format.js";
export interface UploadFileParams {
    data: string;
    filename: string;
    lang_iso: string;
    convert_placeholders?: boolean;
    detect_icu_plurals?: boolean;
    tags?: string[];
    tag_inserted_keys?: boolean;
    tag_updated_keys?: boolean;
    tag_skipped_keys?: boolean;
    replace_modified?: boolean;
    slashn_to_linebreak?: boolean;
    keys_to_values?: boolean;
    distinguish_by_file?: boolean;
    apply_tm?: boolean;
    use_automations?: boolean;
    hidden_from_contributors?: boolean;
    cleanup_mode?: boolean;
    custom_translation_status_ids?: string[] | number[];
    custom_translation_status_inserted_keys?: boolean;
    custom_translation_status_updated_keys?: boolean;
    custom_translation_status_skipped_keys?: boolean;
    skip_detect_lang_iso?: boolean;
    format?: FileFormat;
    filter_task_id?: number;
}
