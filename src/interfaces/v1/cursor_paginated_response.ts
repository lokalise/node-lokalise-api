export interface CursorPaginatedResponseV1<T = unknown> {
	readonly data: T[];
	readonly next_cursor: string | null;
	readonly has_more: boolean;
}
