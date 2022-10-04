import { BaseCollection } from "./base_collection.js";
import { Team } from "../models/team.js";
import { PaginationParams } from "../interfaces/pagination_params.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
export declare class Teams extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Team;
    list(request_params?: PaginationParams): Promise<PaginatedResult<Team>>;
}
