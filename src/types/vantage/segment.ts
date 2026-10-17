import type { CursorPaginationParams } from "./cursor_pagination_params.js";

export type SegmentStatusVantage =
	| "TRANSLATING"
	| "TRANSLATION_FAILED"
	| "LQA_IN_PROGRESS"
	| "PENDING_REVIEW"
	| "APPROVED";

export type SegmentLastChangeSourceVantage =
	| "TRANSLATION_MEMORY"
	| "AI"
	| "HUMAN"
	| "IMPORT";

export type SegmentParams = CursorPaginationParams & {
	project_id: string;
	content_unit_id: string;
	"filter-languages"?: string[];
};
