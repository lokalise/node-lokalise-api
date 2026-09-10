import type { CursorPaginatedResultV1 } from "../../interfaces/v1/cursor_paginated_result.js";
import { ProjectItemVantage } from "../../models/vantage/project_item.js";
import type { ProjectItemParams } from "../../types/vantage/project_items.js";
import { BaseCollection } from "../base_collection.js";

export class ProjectItems extends BaseCollection<ProjectItemVantage> {
	protected static override prefixURI = "projects/{!:project_id}/items";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => ProjectItemVantage {
		return ProjectItemVantage;
	}

	list(
		request_params: ProjectItemParams,
	): Promise<CursorPaginatedResultV1<ProjectItemVantage>> {
		return this.doListCursorV1(request_params);
	}
}
