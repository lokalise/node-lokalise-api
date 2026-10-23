import type {
	TaskVantage as ITaskVantage,
	TaskAssignmentVantage,
} from "../../interfaces/vantage/task.js";
import type { TaskStatusVantage, TaskTypeVantage } from "../../types/vantage/task.js";

export class TaskVantage implements ITaskVantage {
	readonly id!: string;
	readonly publicId!: string;
	readonly title!: string;
	readonly type!: TaskTypeVantage;
	readonly status!: TaskStatusVantage;
	readonly description!: string | null;
	readonly taskAssignments!: TaskAssignmentVantage[];
	readonly dueDate?: string | null;
	readonly createdAt!: string;
	readonly requestedBy!: string | null;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
