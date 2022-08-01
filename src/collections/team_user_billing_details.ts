import { TeamUserBillingDetails as BillingDetailsModel } from "../models/team_user_billing_details";
import { BaseCollection } from "./base_collection";
import { TeamOnly } from "../interfaces/team_only";

type BillingDetailsParams = {
  billing_email: string;
  country_code: string;
  zip: string | number;
  state_code?: string;
  address1?: string;
  address2?: string;
  city?: string;
  phone?: string;
  company?: string;
  vatnumber?: string;
};

export class TeamUserBillingDetails extends BaseCollection {
  protected static rootElementName = "";
  protected static prefixURI = "teams/{!:team_id}/billing_details";
  protected static elementClass = BillingDetailsModel;

  get(team_id: string | number): Promise<BillingDetailsModel> {
    const params = { team_id: team_id };
    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      null
    );
  }

  create(
    billing_details_params: BillingDetailsParams,
    request_params: TeamOnly
  ): Promise<BillingDetailsModel> {
    return this.doCreate(billing_details_params, request_params);
  }

  update(
    team_id: string | number,
    billing_details_params: BillingDetailsParams
  ): Promise<any> {
    const params = { team_id: team_id };
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      billing_details_params
    );
  }
}
