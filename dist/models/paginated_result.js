"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResult = void 0;
class PaginatedResult {
    constructor(items, headers) {
        this.totalResults = parseInt(Object(headers)["x-pagination-total-count"]);
        this.totalPages = parseInt(Object(headers)["x-pagination-page-count"]);
        this.resultsPerPage = parseInt(Object(headers)["x-pagination-limit"]);
        this.currentPage = parseInt(Object(headers)["x-pagination-page"]);
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
exports.PaginatedResult = PaginatedResult;
//# sourceMappingURL=paginated_result.js.map