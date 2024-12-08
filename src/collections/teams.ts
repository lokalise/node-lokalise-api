import type { Keyable } from "../interfaces/keyable.js";
import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Team } from "../models/team.js";
import type { PaginationParams } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";

export class Teams extends BaseCollection<Team> {
	protected static prefixURI = "teams";

	protected get elementClass(): new (
		json: Keyable,
	) => Team {
		return Team;
	}

	protected get rootElementName(): string {
		return "teams";
	}

	list(request_params: PaginationParams = {}): Promise<PaginatedResult<Team>> {
		return this.doList(request_params) as Promise<PaginatedResult<Team>>;
	}
}
