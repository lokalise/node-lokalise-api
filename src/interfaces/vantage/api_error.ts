export interface ApiErrorVantage {
	readonly message: string;
	readonly code: string;
	readonly details?: Record<string, unknown>;
}
