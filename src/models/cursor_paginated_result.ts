import { CursorPaginatedResult as CursorPaginatedResultInterface } from "../interfaces/cursor_paginated_result.js";
import { PaginatedResult } from "./paginated_result.js";

export class CursorPaginatedResult
  extends PaginatedResult
  implements CursorPaginatedResultInterface
{
  nextCursor: string | null;

  constructor(items: any[], headers: Headers) {
    super(items, headers);

    this.nextCursor = headers.get("x-pagination-next-cursor");

    return this;
  }

  hasNextCursor(): boolean {
    return this.nextCursor !== null;
  }
}
