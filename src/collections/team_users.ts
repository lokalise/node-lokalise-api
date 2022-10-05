import { BaseCollection } from "./base_collection.js";
import { TeamUser } from "../models/team_user.js";
import { TeamWithPagination } from "../interfaces/team_with_pagination.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { TeamOnly } from "../interfaces/team_only.js";

type TeamUserParams = {
  role?: "owner" | "admin" | "member" | "biller";
};

type TeamUserDeleted = {
  team_id: string;
  team_user_deleted: boolean;
};

export class TeamUsers extends BaseCollection {
  protected static rootElementName = "team_users";
  protected static rootElementNameSingular = "team_user";
  protected static prefixURI = "teams/{!:team_id}/users/{:id}";
  protected static elementClass = TeamUser;

  list(request_params: TeamWithPagination): Promise<PaginatedResult<TeamUser>> {
    return this.doList(request_params);
  }

  get(
    team_user_id: string | number,
    request_params: TeamOnly
  ): Promise<TeamUser> {
    return this.doGet(team_user_id, request_params);
  }

  update(
    team_user_id: string | number,
    team_user_params: TeamUserParams,
    request_params: TeamOnly
  ): Promise<TeamUser> {
    return this.doUpdate(team_user_id, team_user_params, request_params);
  }

  delete(
    team_user_id: string | number,
    request_params: TeamOnly
  ): Promise<TeamUserDeleted> {
    return this.doDelete(team_user_id, request_params);
  }
}
