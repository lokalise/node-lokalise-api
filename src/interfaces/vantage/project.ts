import type { ProjectTranslationSettingsVantage } from "../../types/vantage/project.js";
import type { ProjectLanguageVantage } from "./project_language.js";

export interface ProjectVantage {
	readonly projectId: string;
	readonly teamId: string;
	readonly name: string;
	readonly description: string;
	readonly baseLanguage: Pick<ProjectLanguageVantage, "languageId" | "locale">;
	readonly targetLanguages: Pick<
		ProjectLanguageVantage,
		"languageId" | "locale"
	>[];
	readonly translationSettings: ProjectTranslationSettingsVantage;
	readonly contentSourceType: string | null;
	readonly contentSourceName?: string | null;
	readonly projectType: string;
}
