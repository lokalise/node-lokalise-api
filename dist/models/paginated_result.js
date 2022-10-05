export class PaginatedResult {
    totalResults;
    totalPages;
    resultsPerPage;
    currentPage;
    items;
    constructor(items, headers) {
        this.totalResults = parseInt(headers["x-pagination-total-count"]);
        this.totalPages = parseInt(headers["x-pagination-page-count"]);
        this.resultsPerPage = parseInt(headers["x-pagination-limit"]);
        this.currentPage = parseInt(headers["x-pagination-page"]);
        this.items = items;
        return this;
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
        else {
            return this.currentPage + 1;
        }
    }
    prevPage() {
        if (this.isFirstPage()) {
            return this.currentPage;
        }
        else {
            return this.currentPage - 1;
        }
    }
}
//# sourceMappingURL=paginated_result.js.map