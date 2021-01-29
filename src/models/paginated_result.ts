import { PaginatedResult as PaginatedResultInterface } from "../interfaces/paginated_result";

export class PaginatedResult implements PaginatedResultInterface {
  totalResults: number;
  totalPages: number;
  resultsPerPage: number;
  currentPage: number;
  items: any[];

  constructor(items: any[], headers: Object) {
    this.totalResults = parseInt(Object(headers)["x-pagination-total-count"]);
    this.totalPages = parseInt(Object(headers)["x-pagination-page-count"]);
    this.resultsPerPage = parseInt(Object(headers)["x-pagination-limit"]);
    this.currentPage = parseInt(Object(headers)["x-pagination-page"]);
    this.items = items;
    return this;
  }

  hasNextPage(): boolean {
    return this.currentPage > 0 && this.currentPage < this.totalPages;
  }

  hasPrevPage(): boolean {
    return this.currentPage > 1;
  }

  isLastPage(): boolean {
    return !this.hasNextPage();
  }

  isFirstPage(): boolean {
    return !this.hasPrevPage();
  }

  nextPage(): number {
    if (this.isLastPage()) {
      return this.currentPage;
    } else {
      return this.currentPage + 1;
    }
  }

  prevPage(): number {
    if (this.isFirstPage()) {
      return this.currentPage;
    } else {
      return this.currentPage - 1;
    }
  }
}
