import type {
	UploadVantage as IUploadVantage,
	UploadErrorVantage,
	UploadStatusVantage,
} from "../../interfaces/vantage/upload.js";

export class UploadVantage implements IUploadVantage {
	readonly uploadId!: string;
	readonly batchId!: string;
	readonly fileName!: string;
	readonly size!: number;
	readonly createdAt!: string;
	readonly status!: UploadStatusVantage;
	readonly wordCount?: number;
	readonly locale?: string;
	readonly itemId?: string;
	readonly error?: UploadErrorVantage;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
