import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Team } from "../models/team.js";
import type { PaginationParams } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";

export class Teams extends BaseCollection<Team> {
	protected static override prefixURI = "teams";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => Team {
		return Team;
	}

	protected override get rootElementName(): string {
		return "teams";
	}

	list(request_params: PaginationParams = {}): Promise<PaginatedResult<Team>> {
		return this.doList(request_params) as Promise<PaginatedResult<Team>>;
	}
}
