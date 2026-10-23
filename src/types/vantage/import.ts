export type ImportParams =
	| {
			batchId: string;
			uploads?: never;
	  }
	| {
			batchId?: never;
			uploads: { uploadId: string }[];
	  };
