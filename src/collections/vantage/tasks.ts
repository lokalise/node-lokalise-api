import type { CursorPaginatedResultVantage } from "../../interfaces/vantage/cursor_paginated_result.js";
import { TaskVantage } from "../../models/vantage/task.js";
import type { TaskParams } from "../../types/vantage/task.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class TasksVantage extends BaseCollectionVantage<TaskVantage> {
	protected static override prefixURI =
		"teams/{!:team_id}/projects/{!:project_id}/tasks";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => TaskVantage {
		return TaskVantage;
	}

	list(
		request_params: TaskParams,
	): Promise<CursorPaginatedResultVantage<TaskVantage>> {
		return this.doListCursorVantage(request_params);
	}
}
