import { BaseCollection } from "./base_collection";
import { TeamUser } from "../models/team_user";
import { StandartParams } from "../interfaces/standart_params";

export class TeamUsers extends BaseCollection {
  protected static rootElementName: string = "team_users";
  protected static rootElementNameSingular: string = "team_user";
  protected static prefixURI: string = "teams/{!:team_id}/users/{:id}";
  protected static elementClass: object = TeamUser;

  update(
    id: string | number,
    body: object,
    params: StandartParams
  ): Promise<TeamUser> {
    params["id"] = id;
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }
}
