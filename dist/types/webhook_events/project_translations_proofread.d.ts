import type { Filenames } from "../filenames.js";
export type WebhookProjectTranslationsProofread = {
	event: "project.translations.proofread";
	action: string;
	translations: Array<{
		id: number;
		value: string;
		is_proofread: boolean;
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
		email: string;
		full_name: string;
	};
	created_at: string;
	created_at_timestamp: number;
};
