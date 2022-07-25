import { BaseModel } from "./base_model.js";
import { TeamUserBillingDetails as TeamUserBillingDetailsInterface } from "../interfaces/team_user_billing_details.js";

export class TeamUserBillingDetails
  extends BaseModel
  implements TeamUserBillingDetailsInterface
{
  declare billing_email: string;
  declare country_code: string;
  declare zip: string;
  declare state_code: string;
  declare address1: string;
  declare address2: string;
  declare city: string;
  declare phone: string;
  declare company: string;
  declare vatnumber: string;
}
