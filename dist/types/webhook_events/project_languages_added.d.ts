export type WebhookProjectLanguagesAdded = {
	event: "project.languages.added";
	languages: Array<{
		id: number;
		iso: string;
		name: string;
	}>;
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
