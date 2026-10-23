import type { UploadErrorVantage } from "./upload.js";

export interface UploadTargetVantage {
	readonly url: string;
	readonly fields: Record<string, string>;
	readonly expiresAt: string;
}

export interface StagedUploadSuccessVantage {
	readonly fileName: string;
	readonly uploadId: string;
	readonly status: "UPLOADING";
	readonly upload: UploadTargetVantage;
	readonly error?: never;
}

export interface StagedUploadFailureVantage {
	readonly fileName: string;
	readonly error: UploadErrorVantage;
	readonly uploadId?: never;
	readonly status?: never;
	readonly upload?: never;
}

export interface UploadStageVantage {
	readonly batchId: string;
	readonly uploads: (StagedUploadSuccessVantage | StagedUploadFailureVantage)[];
}
