export type UploadStatusVantage =
	| "UPLOADING"
	| "UPLOADED"
	| "IMPORTING"
	| "IMPORTED"
	| "UPLOAD_FAILED"
	| "IMPORT_FAILED";

export interface UploadErrorVantage {
	readonly code: string;
	readonly message: string;
}

export interface UploadVantage {
	readonly uploadId: string;
	readonly batchId: string;
	readonly fileName: string;
	readonly size: number;
	readonly createdAt: string;
	readonly status: UploadStatusVantage;
	readonly wordCount?: number;
	readonly locale?: string;
	readonly itemId?: string;
	readonly error?: UploadErrorVantage;
}
