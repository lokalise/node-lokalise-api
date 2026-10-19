import type { ImportVantage as IImportVantage } from "../../interfaces/vantage/import.js";

export class ImportVantage implements IImportVantage {
	readonly importId!: string;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
