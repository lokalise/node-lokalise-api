import type { Filenames } from "../filenames.js";

export type WebhookProjectKeysModified = {
	event: "project.keys.modified";
	action?: string;
	keys: Array<{
		id: number;
		name: string;
		previous_name?: string | null;
		tags: string[];
		filenames: Filenames;
		hidden: boolean;
		screenshots: string[] | number[];
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
