import type {
	TaskAssigneeTypeVantage,
	TaskSegmentStatusVantage,
	TaskStatusVantage,
	TaskTypeVantage,
} from "../../types/vantage/task.js";

export interface TaskAssigneeVantage {
	readonly contributorId: string;
	readonly type: TaskAssigneeTypeVantage;
}

export interface TaskProgressVantage {
	readonly completedUnits: number;
	readonly totalUnits: number;
	readonly completedWords: number;
	readonly totalWords: number;
}

export interface TaskSegmentVantage {
	readonly id: string;
	readonly unitId: string;
	readonly status: TaskSegmentStatusVantage;
	readonly createdAt: string;
	readonly completedAt?: string | null;
}

export interface TaskAssignmentVantage {
	readonly languageId: string;
	readonly assignees: TaskAssigneeVantage[];
	readonly progress: TaskProgressVantage;
	readonly segments: TaskSegmentVantage[];
}

export interface TaskVantage {
	readonly id: string;
	readonly publicId: string;
	readonly title: string;
	readonly type: TaskTypeVantage;
	readonly status: TaskStatusVantage;
	readonly description: string | null;
	readonly taskAssignments: TaskAssignmentVantage[];
	readonly dueDate?: string | null;
	readonly createdAt: string;
	readonly requestedBy: string | null;
}
