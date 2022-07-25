import { BaseCollection } from "./base_collection.js";
import { TeamUser } from "../models/team_user.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class TeamUsers extends BaseCollection {
  protected static rootElementName = "team_users";
  protected static rootElementNameSingular = "team_user";
  protected static prefixURI = "teams/{!:team_id}/users/{:id}";
  protected static elementClass = TeamUser;

  update(
    id: string | number,
    body: Keyable,
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
