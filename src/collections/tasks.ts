import { BaseCollection } from "./base_collection.js";
import { Task } from "../models/task.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type {
  CreateTaskParams,
  UpdateTaskParams,
  TaskDeleted,
  ListTaskParams,
} from "../types/tasks.js";

export class Tasks extends BaseCollection {
  protected static rootElementName = "tasks";
  protected static rootElementNameSingular = "task";
  protected static prefixURI = "projects/{!:project_id}/tasks/{:id}";
  protected static elementClass = Task;

  list(request_params: ListTaskParams): Promise<PaginatedResult<Task>> {
    return this.doList(request_params);
  }

  create(
    task_params: CreateTaskParams,
    request_params: ProjectOnly,
  ): Promise<Task> {
    return this.doCreate(
      task_params,
      request_params,
      this.populateObjectFromJsonRoot,
    );
  }

  get(task_id: string | number, request_params: ProjectOnly): Promise<Task> {
    return this.doGet(task_id, request_params);
  }

  update(
    task_id: string | number,
    task_params: UpdateTaskParams,
    request_params: ProjectOnly,
  ): Promise<Task> {
    return this.doUpdate(task_id, task_params, request_params);
  }

  delete(
    task_id: string | number,
    request_params: ProjectOnly,
  ): Promise<TaskDeleted> {
    return this.doDelete(task_id, request_params);
  }
}
