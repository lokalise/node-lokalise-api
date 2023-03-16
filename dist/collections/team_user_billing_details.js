import { TeamUserBillingDetails as BillingDetailsModel } from "../models/team_user_billing_details.js";
import { BaseCollection } from "./base_collection.js";
class TeamUserBillingDetails extends BaseCollection {
    static rootElementName = "";
    static prefixURI = "teams/{!:team_id}/billing_details";
    static elementClass = BillingDetailsModel;
    get(team_id) {
        const params = { team_id: team_id };
        return this.createPromise("GET", params, this.populateObjectFromJson, this.handleReject, null);
    }
    create(billing_details_params, request_params) {
        return this.doCreate(billing_details_params, request_params);
    }
    update(team_id, billing_details_params) {
        const params = { team_id: team_id };
        return this.createPromise("PUT", params, this.populateObjectFromJson, this.handleReject, billing_details_params);
    }
}
export { TeamUserBillingDetails };
//# sourceMappingURL=team_user_billing_details.js.map