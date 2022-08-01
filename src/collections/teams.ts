import { BaseCollection } from "./base_collection";
import { Team } from "../models/team";
import { PaginationParams } from "../interfaces/pagination_params";
import { PaginatedResult } from "../interfaces/paginated_result";

export class Teams extends BaseCollection {
  protected static rootElementName = "teams";
  protected static prefixURI = "teams";
  protected static elementClass = Team;

  list(request_params: PaginationParams = {}): Promise<PaginatedResult<Team>> {
    return this.doList(request_params);
  }
}
