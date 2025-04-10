import type { PaginatedResult } from "./paginated_result.js";

export interface CursorPaginatedResult<T = unknown> extends PaginatedResult<T> {
	readonly nextCursor: string | null;

	hasNextCursor(): boolean;
}
