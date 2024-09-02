export type WebhookProjectBranchDeleted = {
	event: "project.branch.deleted";
	project: {
		id: string;
		name: string;
	};
	branch: {
		id: number | string;
		name: string;
	};
	user: {
		full_name: string;
		email: string;
	};
	created_at: string;
	created_at_timestamp: number;
};
