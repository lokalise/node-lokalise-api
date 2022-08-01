import { BaseCollection } from "./base_collection";
import { Team } from "../models/team";
import { PaginationParams } from "../interfaces/pagination_params";
import { PaginatedResult } from "../interfaces/paginated_result";
export declare class Teams extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Team;
    list(request_params?: PaginationParams): Promise<PaginatedResult<Team>>;
}
