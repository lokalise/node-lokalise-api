export type WebhookProjectDeleted = {
	event: "project.deleted";
	project: {
		id: string;
		name: string;
	};
	user: {
		full_name: string;
		email: string;
	};
	created_at: string;
	created_at_timestamp: number;
};
