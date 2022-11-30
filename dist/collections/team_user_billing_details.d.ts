import { TeamUserBillingDetails as BillingDetailsModel } from "../models/team_user_billing_details.js";
import { BaseCollection } from "./base_collection.js";
import { TeamOnly } from "../interfaces/team_only.js";
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
export declare class TeamUserBillingDetails extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof BillingDetailsModel;
    get(team_id: string | number): Promise<BillingDetailsModel>;
    create(billing_details_params: BillingDetailsParams, request_params: TeamOnly): Promise<BillingDetailsModel>;
    update(team_id: string | number, billing_details_params: BillingDetailsParams): Promise<any>;
}
export {};
