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
export {};
