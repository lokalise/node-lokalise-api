export interface CursorPaginatedResponseV1<T = unknown> {
	readonly data: T[];

	readonly next_cursor?: string | null;
	readonly has_more?: boolean;

	readonly meta?: {
		readonly cursor: string | null;
		readonly hasMore: boolean;
	};
}
