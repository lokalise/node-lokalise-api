export interface ProjectItemVantage {
	readonly id: string;
	readonly projectId: string;
	readonly type: "FILE" | "GENERIC_CONTENT_ITEM";
	readonly status: "IMPORTING" | "IMPORTED" | "IMPORT_FAILED" | "DELETED";
	readonly name: string;
	readonly userFacingTitle: string;
	readonly previousItemId: string | null;
	readonly importProcessId: string;
	readonly createdAt: string;
	readonly updatedAt: string;
	readonly metadata: {
		readonly importItemId?: string;
		readonly originalContentUnitType?: string;
		readonly sourceTitle?: string;
		readonly sourceSlug?: string;
		readonly sourceContentKindLabel?: string;
		readonly sourceUpdatedAt?: string;
		readonly sourceSentToIntegrationAt?: string;

		readonly [key: string]: unknown;
	};
	readonly file: {
		readonly id: string;
		readonly storageId: string;
		readonly path: string;
		readonly format: string;
	} | null;
}
