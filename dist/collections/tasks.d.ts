import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Task } from "../models/task.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type { CreateTaskParams, ListTaskParams, TaskDeleted, UpdateTaskParams } from "../types/tasks.js";
import { BaseCollection } from "./base_collection.js";
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
