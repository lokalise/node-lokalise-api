export interface BulkResult<T = unknown> {
	readonly items: T[];
	readonly errors: {
		message: string;
		code: number;
		[key: string]: unknown;
	}[];
}
