import { TeamOnly } from "./team_only.js";
import { PaginationParams } from "./pagination_params.js";
export interface TeamWithPagination extends TeamOnly, PaginationParams {
}
