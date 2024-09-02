export type CreateSnapshotParams = {
	title: string;
};
export type SnapshotDeleted = {
	project_id: string;
	snapshot_deleted: boolean;
	branch?: string;
};
