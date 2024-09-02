import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { TeamUser } from "../models/team_user.js";
import type { TeamOnly } from "../types/common_get_params.js";
import type { TeamUserDeleted, TeamUserParams } from "../types/team_users.js";
import type { TeamWithPagination } from "../types/teams.js";
import { BaseCollection } from "./base_collection.js";
export declare class TeamUsers extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof TeamUser;
    list(request_params: TeamWithPagination): Promise<PaginatedResult<TeamUser>>;
    get(team_user_id: string | number, request_params: TeamOnly): Promise<TeamUser>;
    update(team_user_id: string | number, team_user_params: TeamUserParams, request_params: TeamOnly): Promise<TeamUser>;
    delete(team_user_id: string | number, request_params: TeamOnly): Promise<TeamUserDeleted>;
}
