import type { PaginatedResult } from "./paginated_result.js";

export interface CursorPaginatedResult<T = any> extends PaginatedResult<T> {
	readonly nextCursor: string | null;

	hasNextCursor(): boolean;
}
