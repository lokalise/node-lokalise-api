import type { CursorPaginationParams } from "./cursor_pagination_params.js";

export type UploadListParams = {
	project_id: string;
	"filter-batch-id"?: string;
	"filter-ids"?: string[];
} & CursorPaginationParams;

export type UploadStageFileParams = {
	fileName: string;
	mimeType: string;
	size: number;
	checksum: string;
};

export type UploadStageParams = {
	batchId?: string;
	uploads: UploadStageFileParams[];
};

export type UploadCompleteParams =
	| {
			batchId: string;
			uploadIds?: never;
	  }
	| {
			batchId?: never;
			uploadIds: string[];
	  };
