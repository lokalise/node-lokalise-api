import type { CursorPaginatedResultVantage } from "../../interfaces/vantage/cursor_paginated_result.js";
import { ProjectItemVantage } from "../../models/vantage/project_item.js";
import type { ProjectItemParams } from "../../types/vantage/project_items.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class ProjectItems extends BaseCollectionVantage<ProjectItemVantage> {
	protected static override prefixURI = "projects/{!:project_id}/items";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => ProjectItemVantage {
		return ProjectItemVantage;
	}

	list(
		request_params: ProjectItemParams,
	): Promise<CursorPaginatedResultVantage<ProjectItemVantage>> {
		return this.doListCursorVantage(request_params);
	}
}
