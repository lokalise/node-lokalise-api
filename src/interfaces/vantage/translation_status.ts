export type TranslationProgressStatusVantage =
	| "TRANSLATING"
	| "PENDING_REVIEW"
	| "COMPLETED"
	| "FAILED"
	| (string & {});

export type TranslationLanguageStatusVantage =
	| "TRANSLATING"
	| "PENDING_REVIEW"
	| "COMPLETED"
	| (string & {});

export interface TranslationStatusLanguageVantage {
	readonly languageId: string;
	readonly locale: string;
	readonly status: TranslationLanguageStatusVantage;
}

export interface TranslationStatusVantage {
	readonly projectId: string;
	readonly importId: string;
	readonly status: TranslationProgressStatusVantage;
	readonly languages: TranslationStatusLanguageVantage[];
}
