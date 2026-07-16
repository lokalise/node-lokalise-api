import type { CursorPaginatedResponseV1 } from "../../interfaces/v1/cursor_paginated_response.js";

import type { CursorPaginatedResultV1 as ICursorPaginatedResultV1 } from "../../interfaces/v1/cursor_paginated_result.js";

export class CursorPaginatedResultV1<T> implements ICursorPaginatedResultV1<T> {
	readonly next_cursor: string | null;
	readonly has_more: boolean;
	readonly items: T[];

	constructor(response: CursorPaginatedResponseV1<T>) {
		this.items = response.data;
		this.next_cursor = response.next_cursor;
		this.has_more = response.has_more;
	}
}
