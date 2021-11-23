import { TeamUserBillingDetails as BillingDetailsModel } from "../models/team_user_billing_details";
import { BaseCollection } from "./base_collection";
import { StandartParams } from "../interfaces/standart_params";

export class TeamUserBillingDetails extends BaseCollection {
  protected static rootElementName: string = "";
  protected static prefixURI: string = "teams/{!:team_id}/billing_details";
  protected static elementClass: object = BillingDetailsModel;

  get(team_id: string | number, params: StandartParams = {}): Promise<any> {
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
    body: object | object[] | null,
    params: StandartParams = {}
  ): Promise<any> {
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
