import type {
	TranslationStatusVantage as ITranslationStatusVantage,
	TranslationProgressStatusVantage,
	TranslationStatusLanguageVantage,
} from "../../interfaces/vantage/translation_status.js";

export class TranslationStatusVantage implements ITranslationStatusVantage {
	readonly projectId!: string;
	readonly importId!: string;
	readonly status!: TranslationProgressStatusVantage;
	readonly languages!: TranslationStatusLanguageVantage[];

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
