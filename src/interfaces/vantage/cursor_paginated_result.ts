export interface CursorPaginatedResultVantage<T = unknown> {
	readonly count: number;
	readonly nextCursor: string | null;
	readonly hasMore: boolean;
	readonly items: T[];
}
