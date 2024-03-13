import { TaskLanguage } from "./task_language.js";
export type CreateTaskParams = {
    title: string;
    description?: string;
    due_date?: string;
    keys?: string[] | number[];
    languages?: Array<TaskLanguage>;
    source_language_iso?: string;
    auto_close_languages?: boolean;
    auto_close_task?: boolean;
    auto_close_items?: boolean;
    task_type?: string;
    parent_task_id?: string | number;
    closing_tags?: string[];
    do_lock_translations?: boolean;
    custom_translation_status_ids?: string[] | number[];
};
