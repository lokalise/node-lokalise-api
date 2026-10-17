import type { CursorPaginationParams } from "./cursor_pagination_params.js";

export type TaskTypeVantage = "review";

export type TaskStatusVantage = "created" | "in_progress" | "closed";

export type TaskAssigneeTypeVantage = "user" | "user_group";

export type TaskSegmentStatusVantage = "pending" | "completed";

export type TaskParams = CursorPaginationParams & {
	team_id: string;
	project_id: string;
	"filter-ids"?: string[];
	"filter-item-ids"?: string[];
	"include-segments"?: boolean;
};
