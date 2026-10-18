import type { ExportDownloadUrlVantage as IExportDownloadUrlVantage } from "../../interfaces/vantage/export_download_url.js";

export class ExportDownloadUrlVantage implements IExportDownloadUrlVantage {
	readonly downloadUrl!: string;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
