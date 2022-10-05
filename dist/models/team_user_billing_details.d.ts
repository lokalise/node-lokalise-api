import { BaseModel } from "./base_model.js";
import { TeamUserBillingDetails as TeamUserBillingDetailsInterface } from "../interfaces/team_user_billing_details.js";
export declare class TeamUserBillingDetails extends BaseModel implements TeamUserBillingDetailsInterface {
    billing_email: string;
    country_code: string;
    zip: string;
    state_code: string;
    address1: string;
    address2: string;
    city: string;
    phone: string;
    company: string;
    vatnumber: string;
}
