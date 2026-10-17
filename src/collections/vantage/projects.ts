import type { CursorPaginatedResultVantage } from "../../interfaces/vantage/cursor_paginated_result.js";
import { ProjectVantage } from "../../models/vantage/project.js";
import type { ProjectParams } from "../../types/vantage/project.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class ProjectsVantage extends BaseCollectionVantage<ProjectVantage> {
	protected static override prefixURI = "teams/{!:team_id}/projects";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => ProjectVantage {
		return ProjectVantage;
	}

	list(
		request_params: ProjectParams,
	): Promise<CursorPaginatedResultVantage<ProjectVantage>> {
		return this.doListCursorVantage(request_params);
	}

	get(request_params: { project_id: string }): Promise<ProjectVantage> {
		return this.doGetVantage(request_params, "projects/{!:project_id}");
	}
}
