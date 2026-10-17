import { ProjectLanguageVantage } from "../../models/vantage/project_language.js";
import type { ProjectLanguageParams } from "../../types/vantage/project_language.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class ProjectLanguagesVantage extends BaseCollectionVantage<ProjectLanguageVantage> {
	protected static override prefixURI = "projects/{!:project_id}/languages";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => ProjectLanguageVantage {
		return ProjectLanguageVantage;
	}

	list(
		request_params: ProjectLanguageParams,
	): Promise<ProjectLanguageVantage[]> {
		return this.doListArrayVantage(request_params);
	}
}
