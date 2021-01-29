import { PaginatedResult as PaginatedResultInterface } from "../interfaces/paginated_result";
export declare class PaginatedResult implements PaginatedResultInterface {
    totalResults: number;
    totalPages: number;
    resultsPerPage: number;
    currentPage: number;
    items: any[];
    constructor(items: any[], headers: Object);
    hasNextPage(): boolean;
    hasPrevPage(): boolean;
    isLastPage(): boolean;
    isFirstPage(): boolean;
    nextPage(): number;
    prevPage(): number;
}
