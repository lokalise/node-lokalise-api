import type { Filenames } from "../filenames.js";

export type WebhookProjectTranslationsUpdated = {
	event: "project.translations.updated";
	action: string;
	translations: Array<{
		id: number;
		value: string;
		previous_value: string;
		language: {
			id: number;
			iso: string;
			name: string;
		};
		key: {
			id: number;
			name: string;
			filenames: Filenames;
		};
	}>;
	project: {
		id: string;
		name: string;
		branch?: string;
	};
	user: {
		full_name: string;
		email: string;
	};
	created_at: string;
	created_at_timestamp: number;
};
