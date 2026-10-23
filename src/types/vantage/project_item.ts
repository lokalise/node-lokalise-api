import type { CursorPaginationParams } from "./cursor_pagination_params.js";

export type ProjectItemParams = CursorPaginationParams & {
	project_id: string;
	"filter-ids"?: string[];
	"filter-names"?: string[];
};
