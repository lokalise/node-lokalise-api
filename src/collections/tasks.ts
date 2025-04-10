import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Task } from "../models/task.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type {
	CreateTaskParams,
	ListTaskParams,
	TaskDeleted,
	UpdateTaskParams,
} from "../types/tasks.js";
import { BaseCollection } from "./base_collection.js";

export class Tasks extends BaseCollection<Task> {
	protected static override prefixURI = "projects/{!:project_id}/tasks/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => Task {
		return Task;
	}

	protected override get rootElementName(): string {
		return "tasks";
	}

	protected override get rootElementNameSingular(): string | null {
		return "task";
	}

	list(request_params: ListTaskParams): Promise<PaginatedResult<Task>> {
		return this.doList(request_params) as Promise<PaginatedResult<Task>>;
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
