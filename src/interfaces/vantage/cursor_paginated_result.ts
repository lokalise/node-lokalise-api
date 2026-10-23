export interface CursorPaginatedResultVantage<T = unknown> {
	readonly count: number;
	readonly cursor: string | null;
	readonly hasMore: boolean;
	readonly items: T[];
}
