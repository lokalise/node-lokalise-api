import type { ProjectLanguageVantage as IProjectLanguageVantage } from "../../interfaces/vantage/project_language.js";

export class ProjectLanguageVantage implements IProjectLanguageVantage {
	readonly languageId!: string;
	readonly locale!: string;
	readonly languageName!: string;
	readonly isRtl!: boolean;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
