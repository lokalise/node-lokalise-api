export type CreateTranslationStatusParams = {
	title: string;
	color: string;
};

export type UpdateTranslationStatusParams = {
	title?: string;
	color?: string;
};

export type TranslationStatusDeleted = {
	project_id: string;
	custom_translation_status_deleted: boolean;
	branch?: string;
};

export type TranslationStatusColors = {
	colors: string[];
};
