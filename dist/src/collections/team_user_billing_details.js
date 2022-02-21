import { TeamUserBillingDetails as BillingDetailsModel } from "../models/team_user_billing_details";
import { BaseCollection } from "./base_collection";
export class TeamUserBillingDetails extends BaseCollection {
    get(team_id, params = {}) {
        params["team_id"] = team_id;
        return this.createPromise("GET", params, this.populateObjectFromJson, this.handleReject, null);
    }
    update(team_id, body, params = {}) {
        params["team_id"] = team_id;
        return this.createPromise("PUT", params, this.populateObjectFromJson, this.handleReject, body);
    }
}
TeamUserBillingDetails.rootElementName = "";
TeamUserBillingDetails.prefixURI = "teams/{!:team_id}/billing_details";
TeamUserBillingDetails.elementClass = BillingDetailsModel;
//# sourceMappingURL=team_user_billing_details.js.map