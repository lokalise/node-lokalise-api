import { BaseCollection } from "./base_collection.js";
import { Team } from "../models/team.js";
import { PaginationParams } from "../interfaces/pagination_params.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";

export class Teams extends BaseCollection {
  protected static rootElementName = "teams";
  protected static prefixURI = "teams";
  protected static elementClass = Team;

  list(request_params: PaginationParams = {}): Promise<PaginatedResult<Team>> {
    return this.doList(request_params);
  }
}
