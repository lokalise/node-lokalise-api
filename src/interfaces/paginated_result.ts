export interface PaginatedResult<T = any> {
  readonly totalResults: number;
  readonly totalPages: number;
  readonly resultsPerPage: number;
  readonly currentPage: number;
  readonly items: T[];
  hasNextPage(): boolean;
  hasPrevPage(): boolean;
  isLastPage(): boolean;
  isFirstPage(): boolean;
  nextPage(): number;
  prevPage(): number;
}
