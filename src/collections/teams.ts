import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Team } from "../models/team.js";
import type { PaginationParams } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";

export class Teams extends BaseCollection {
	protected static rootElementName = "teams";
	protected static prefixURI = "teams";
	protected static elementClass = Team;

	list(request_params: PaginationParams = {}): Promise<PaginatedResult<Team>> {
		return this.doList(request_params);
	}
}
