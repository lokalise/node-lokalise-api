import { TeamUserBillingDetails as BillingDetailsModel } from "../models/team_user_billing_details.js";
import { BaseCollection } from "./base_collection.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class TeamUserBillingDetails extends BaseCollection {
  protected static rootElementName = "";
  protected static prefixURI = "teams/{!:team_id}/billing_details";
  protected static elementClass = BillingDetailsModel;

  get(
    team_id: string | number,
    params: StandartParams = {}
  ): Promise<BillingDetailsModel> {
    params["team_id"] = team_id;
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      null
    );
  }

  update(
    team_id: string | number,
    body: Keyable | Keyable[] | null,
    params: StandartParams = {}
  ): Promise<BillingDetailsModel> {
    params["team_id"] = team_id;
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      body
    );
  }
}
