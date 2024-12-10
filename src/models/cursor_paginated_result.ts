import type { CursorPaginatedResult as CursorPaginatedResultInterface } from "../interfaces/cursor_paginated_result.js";
import { PaginatedResult } from "./paginated_result.js";

export class CursorPaginatedResult<T>
	extends PaginatedResult<T>
	implements CursorPaginatedResultInterface
{
	nextCursor: string | null;

	constructor(items: T[], headers: Headers) {
		super(items, headers);

		this.nextCursor = headers.get("x-pagination-next-cursor");
	}

	hasNextCursor(): boolean {
		return this.nextCursor !== null;
	}
}
