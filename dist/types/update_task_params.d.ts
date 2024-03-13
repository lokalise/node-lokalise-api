import { TaskLanguage } from "./task_language.js";
import { CreateTaskParams } from "./create_task_params.js";
export type UpdateTaskParams = Omit<CreateTaskParams, "title" | "keys" | "source_language_iso" | "task_type" | "parent_task_id" | "custom_translation_status_ids"> & {
    title?: string;
    close_task?: boolean;
    languages?: Array<TaskLanguage & {
        close_language?: boolean;
    }>;
};
