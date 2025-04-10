export type UploadedFileProcessDetails = {
	files: {
		status: string;
		message: string;
		name_original: string;
		name_custom?: string;
		word_count_total: number;
		key_count_total: number;
		key_count_inserted: number;
		key_count_updated: number;
		key_count_skipped: number;
	}[];
};

export type DownloadedFileProcessDetails = {
	download_url: string;
	file_size_kb: number;
	total_number_of_keys: number;
};

export type QueuedProcessDetails =
	| UploadedFileProcessDetails
	| DownloadedFileProcessDetails;
