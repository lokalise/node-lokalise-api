export interface PaginatedResult<T = unknown> {
	readonly totalResults: number;
	readonly totalPages: number;
	readonly resultsPerPage: number;
	readonly currentPage: number;
	readonly items: T[];
	readonly responseTooBig: boolean;
	hasNextPage(): boolean;
	hasPrevPage(): boolean;
	isLastPage(): boolean;
	isFirstPage(): boolean;
	nextPage(): number;
	prevPage(): number;
}
