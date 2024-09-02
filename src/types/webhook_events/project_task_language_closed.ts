export type WebhookProjectTaskLanguageClosed = {
	event: "project.task.language.closed";
	language: {
		id: number;
		iso: string;
		name: string;
	};
	task: {
		id: number;
		type: string;
		title: string;
		due_date: string;
		description: string;
	};
	project: {
		id: string;
		name: string;
		branch?: string;
	};
	user: {
		email: string;
		full_name: string;
	};
	created_at: string;
	created_at_timestamp: number;
};
