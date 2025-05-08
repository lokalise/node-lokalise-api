import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Team } from "../models/team.js";
import type { PaginationParams } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";

export class Teams extends BaseCollection<Team> {
	protected static override prefixURI = "teams/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => Team {
		return Team;
	}

	protected override get rootElementName(): string {
		return "teams";
	}

	protected override get rootElementNameSingular(): string | null {
		return "team";
	}

	list(request_params: PaginationParams = {}): Promise<PaginatedResult<Team>> {
		return this.doList(request_params) as Promise<PaginatedResult<Team>>;
	}

	get(id: number | string): Promise<Team> {
		return this.doGet(id);
	}
}
