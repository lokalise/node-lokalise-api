import { BaseCollection } from "./base_collection.js";
import { Task } from "../models/task.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
interface ListTaskParams extends ProjectWithPagination {
    filter_title?: string;
    filter_statuses?: string;
}
type CreateTaskParams = {
    title: string;
    description?: string;
    due_date?: string;
    keys?: string[] | number[];
    languages?: Array<{
        language_iso: string;
        users?: string[] | number[];
        groups?: string[] | number[];
    }>;
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
type UpdateTaskParams = Omit<CreateTaskParams, "title" | "keys" | "source_language_iso" | "task_type" | "parent_task_id" | "custom_translation_status_ids"> & {
    title?: string;
    close_task?: boolean;
};
type TaskDeleted = {
    project_id: string;
    task_deleted: boolean;
};
export declare class Tasks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Task;
    list(request_params: ListTaskParams): Promise<PaginatedResult<Task>>;
    create(task_params: CreateTaskParams, request_params: ProjectOnly): Promise<Task>;
    get(task_id: string | number, request_params: ProjectOnly): Promise<Task>;
    update(task_id: string | number, task_params: UpdateTaskParams, request_params: ProjectOnly): Promise<Task>;
    delete(task_id: string | number, request_params: ProjectOnly): Promise<TaskDeleted>;
}
export {};
