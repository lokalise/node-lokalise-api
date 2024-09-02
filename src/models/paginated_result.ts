import type { PaginatedResult as PaginatedResultInterface } from "../interfaces/paginated_result.js";

export class PaginatedResult implements PaginatedResultInterface {
	totalResults: number;
	totalPages: number;
	resultsPerPage: number;
	currentPage: number;
	items: any[];

	constructor(items: any[], headers: Headers) {
		this.totalResults = this.safeParseInt(
			headers.get("x-pagination-total-count"),
		);
		this.totalPages = this.safeParseInt(headers.get("x-pagination-page-count"));
		this.resultsPerPage = this.safeParseInt(headers.get("x-pagination-limit"));
		this.currentPage = this.safeParseInt(headers.get("x-pagination-page"));
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

	private safeParseInt(str: string | null): number {
		if (!str) return 0;

		return Number.parseInt(str, 10);
	}
}
