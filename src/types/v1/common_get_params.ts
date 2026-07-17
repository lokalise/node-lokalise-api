export type CursorPaginationParamsV1 = {
	/**
	 * Number of results per page.
	 * Minimum: 1. Maximum: 1000.
	 */
	limit?: number;

	/**
	 * Pagination cursor returned by the previous response.
	 */
	cursor?: string;
};
