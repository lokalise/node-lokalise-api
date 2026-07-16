export interface CursorPaginatedResultV1<T = unknown> {
	readonly next_cursor: string | null;
	readonly has_more: boolean;
	readonly items: T[];
}
