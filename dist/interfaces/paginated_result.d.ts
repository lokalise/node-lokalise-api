export interface PaginatedResult {
    readonly totalResults: number;
    readonly totalPages: number;
    readonly resultsPerPage: number;
    readonly currentPage: number;
    readonly items: any[];
    hasNextPage(): boolean;
    hasPrevPage(): boolean;
    isLastPage(): boolean;
    isFirstPage(): boolean;
    nextPage(): number;
    prevPage(): number;
}
