export type WebhookProjectLanguageRemoved = {
	event: "project.language.removed";
	language: {
		id: number;
		iso: string;
		name: string;
	};
	project: {
		id: string;
		name: string;
	};
	user: {
		email: string;
		full_name: string;
	};
	created_at: string;
	created_at_timestamp: number;
};
