import type { ProjectVantage as IProjectVantage } from "../../interfaces/vantage/project.js";
import type { ProjectLanguageVantage as IProjectLanguageVantage } from "../../interfaces/vantage/project_language.js";
import type { ProjectTranslationSettingsVantage } from "../../types/vantage/project.js";

export class ProjectVantage implements IProjectVantage {
	readonly projectId!: string;
	readonly teamId!: string;
	readonly name!: string;
	readonly description!: string;
	readonly baseLanguage!: Pick<IProjectLanguageVantage, "languageId" | "locale">;
	readonly targetLanguages!: Pick<IProjectLanguageVantage, "languageId" | "locale">[];
	readonly translationSettings!: ProjectTranslationSettingsVantage;
	readonly contentSourceType!: string | null;
	readonly contentSourceName?: string | null;
	readonly projectType!: string;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
