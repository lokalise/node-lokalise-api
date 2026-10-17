export interface CursorPaginatedResponseVantage<T = unknown> {
	readonly data: T[];
	readonly meta: {
		readonly count: number;
		readonly cursor: string | null;
		readonly hasMore: boolean;
	};
}
