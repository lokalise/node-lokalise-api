export type WebhookProjectBranchMerged = {
	event: "project.branch.merged";
	project: {
		id: string;
		name: string;
	};
	branch: {
		id: number | string;
		name: string;
	};
	target_branch: {
		id: number | string;
		name: string;
	};
	affected_keys: {
		inserted_count: number;
		updated_count: number;
	};
	user: {
		full_name: string;
		email: string;
	};
	created_at: string;
	created_at_timestamp: number;
};
