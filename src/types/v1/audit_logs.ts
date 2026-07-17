import type { CursorPaginationParamsV1 } from "./common_get_params.js";

export type AuditLogParams = CursorPaginationParamsV1 & {
	/**
	 * Return events on or after this date.
	 *
	 * Format: YYYY-MM-DD. The date starts at 00:00:00 UTC.
	 */
	date_from?: string;

	/**
	 * Return events on or before this date.
	 *
	 * Format: YYYY-MM-DD. The date ends at 23:59:59 UTC.
	 */
	date_to?: string;

	/**
	 * Filter by a specific dot-separated event type.
	 */
	event_type?: string;

	/**
	 * Filter events to a specific project.
	 */
	project_id?: number;

	/**
	 * Filter events initiated by a specific user.
	 */
	user_id?: number;
};
