import type { CursorPaginatedResult as CursorPaginatedResultInterface } from "../interfaces/cursor_paginated_result.js";
import { PaginatedResult } from "./paginated_result.js";
export declare class CursorPaginatedResult extends PaginatedResult implements CursorPaginatedResultInterface {
    nextCursor: string | null;
    constructor(items: any[], headers: Headers);
    hasNextCursor(): boolean;
}
