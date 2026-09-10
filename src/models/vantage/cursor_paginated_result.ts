import type { CursorPaginatedResponseVantage } from "../../interfaces/vantage/cursor_paginated_response.js";
import type { CursorPaginatedResultVantage as ICursorPaginatedResultVantage } from "../../interfaces/vantage/cursor_paginated_result.js";

export class CursorPaginatedResultVantage<T>
	implements ICursorPaginatedResultVantage<T>
{
	readonly count: number;
	readonly nextCursor: string | null;
	readonly hasMore: boolean;
	readonly items: T[];

	constructor(response: CursorPaginatedResponseVantage<T>) {
		this.items = response.data;
		this.count = response.meta.count;
		this.nextCursor = response.meta.cursor;
		this.hasMore = response.meta.hasMore;
	}
}
