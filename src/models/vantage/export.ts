import type {
	ExportStatusVantage,
	ExportVantage as IExportVantage,
} from "../../interfaces/vantage/export.js";

export class ExportVantage implements IExportVantage {
	readonly exportId!: string;
	readonly status!: ExportStatusVantage;
	readonly createdAt?: string;
	readonly totalItemsCount?: number;
	readonly processedItemsCount?: number;
	readonly failReason?: string | null;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
