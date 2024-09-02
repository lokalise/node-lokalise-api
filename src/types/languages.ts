export type CreateLanguageParams = {
	lang_iso: string;
	custom_iso?: string;
	custom_name?: string;
	custom_plural_forms?: string[];
};

export type UpdateLanguageParams = {
	lang_iso?: string;
	lang_name?: string;
	plural_forms?: string[];
};

export type LanguageDeleted = {
	project_id: string;
	language_deleted: boolean;
	branch?: string;
};
