import { PaginatedResult } from "./paginated_result.js";
export class CursorPaginatedResult extends PaginatedResult {
    nextCursor;
    constructor(items, headers) {
        super(items, headers);
        this.nextCursor = headers.get("x-pagination-next-cursor");
    }
    hasNextCursor() {
        return this.nextCursor !== null;
    }
}
//# sourceMappingURL=cursor_paginated_result.js.map