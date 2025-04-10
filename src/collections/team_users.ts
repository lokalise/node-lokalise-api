import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { TeamUser } from "../models/team_user.js";
import type { TeamOnly } from "../types/common_get_params.js";
import type { TeamUserDeleted, TeamUserParams } from "../types/team_users.js";
import type { TeamWithPagination } from "../types/teams.js";
import { BaseCollection } from "./base_collection.js";

export class TeamUsers extends BaseCollection<TeamUser> {
	protected static override prefixURI = "teams/{!:team_id}/users/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => TeamUser {
		return TeamUser;
	}

	protected override get rootElementName(): string {
		return "team_users";
	}

	protected override get rootElementNameSingular(): string | null {
		return "team_user";
	}

	list(request_params: TeamWithPagination): Promise<PaginatedResult<TeamUser>> {
		return this.doList(request_params) as Promise<PaginatedResult<TeamUser>>;
	}

	get(
		team_user_id: string | number,
		request_params: TeamOnly,
	): Promise<TeamUser> {
		return this.doGet(team_user_id, request_params);
	}

	update(
		team_user_id: string | number,
		team_user_params: TeamUserParams,
		request_params: TeamOnly,
	): Promise<TeamUser> {
		return this.doUpdate(team_user_id, team_user_params, request_params);
	}

	delete(
		team_user_id: string | number,
		request_params: TeamOnly,
	): Promise<TeamUserDeleted> {
		return this.doDelete(team_user_id, request_params);
	}
}
