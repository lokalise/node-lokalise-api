import { TeamUserBillingDetails as BillingDetailsModel } from "../models/team_user_billing_details.js";
import { BaseCollection } from "./base_collection.js";
import type { TeamOnly } from "../types/common_get_params.js";
import type { BillingDetailsParams } from "../types/billing_details.js";
export declare class TeamUserBillingDetails extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof BillingDetailsModel;
    get(team_id: string | number): Promise<BillingDetailsModel>;
    create(billing_details_params: BillingDetailsParams, request_params: TeamOnly): Promise<BillingDetailsModel>;
    update(team_id: string | number, billing_details_params: BillingDetailsParams): Promise<BillingDetailsModel>;
}
