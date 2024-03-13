import { BaseCollection } from "./base_collection.js";
import { Task } from "../models/task.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { CreateTaskParams } from "../types/create_task_params.js";
import { UpdateTaskParams } from "../types/update_task_params.js";
interface ListTaskParams extends ProjectWithPagination {
    filter_title?: string;
    filter_statuses?: string;
}
type TaskDeleted = {
    project_id: string;
    task_deleted: boolean;
    branch?: string;
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
