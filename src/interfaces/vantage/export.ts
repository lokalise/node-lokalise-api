export type ExportStatusVantage = "IN_PROGRESS" | "COMPLETED" | "FAILED";

export interface ExportVantage {
	readonly exportId: string;
	readonly status: ExportStatusVantage;
	readonly createdAt?: string;
	readonly totalItemsCount?: number;
	readonly processedItemsCount?: number;
	readonly failReason?: string | null;
}
