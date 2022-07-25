import { TeamUserBillingDetails as BillingDetailsModel } from "../models/team_user_billing_details.js";
import { BaseCollection } from "./base_collection.js";
export class TeamUserBillingDetails extends BaseCollection {
    static rootElementName = "";
    static prefixURI = "teams/{!:team_id}/billing_details";
    static elementClass = BillingDetailsModel;
    get(team_id, params = {}) {
        params["team_id"] = team_id;
        return this.createPromise("GET", params, this.populateObjectFromJson, this.handleReject, null);
    }
    update(team_id, body, params = {}) {
        params["team_id"] = team_id;
        return this.createPromise("PUT", params, this.populateObjectFromJson, this.handleReject, body);
    }
}
//# sourceMappingURL=team_user_billing_details.js.map