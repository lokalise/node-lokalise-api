export class PaginatedResult {
    totalResults;
    totalPages;
    resultsPerPage;
    currentPage;
    items;
    constructor(items, headers) {
        this.totalResults = this.safeParseInt(headers.get("x-pagination-total-count"));
        this.totalPages = this.safeParseInt(headers.get("x-pagination-page-count"));
        this.resultsPerPage = this.safeParseInt(headers.get("x-pagination-limit"));
        this.currentPage = this.safeParseInt(headers.get("x-pagination-page"));
        this.items = items;
    }
    hasNextPage() {
        return this.currentPage > 0 && this.currentPage < this.totalPages;
    }
    hasPrevPage() {
        return this.currentPage > 1;
    }
    isLastPage() {
        return !this.hasNextPage();
    }
    isFirstPage() {
        return !this.hasPrevPage();
    }
    nextPage() {
        if (this.isLastPage()) {
            return this.currentPage;
        }
        return this.currentPage + 1;
    }
    prevPage() {
        if (this.isFirstPage()) {
            return this.currentPage;
        }
        return this.currentPage - 1;
    }
    safeParseInt(str) {
        if (!str) {
            return 0;
        }
        return Number.parseInt(str, 10);
    }
}
//# sourceMappingURL=paginated_result.js.map