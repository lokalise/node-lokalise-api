"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamUserBillingDetails = void 0;
const team_user_billing_details_1 = require("../models/team_user_billing_details");
const base_collection_1 = require("./base_collection");
class TeamUserBillingDetails extends base_collection_1.BaseCollection {
    get(team_id, params = {}) {
        params["team_id"] = team_id;
        return this.createPromise("GET", params, this.populateObjectFromJson, this.handleReject, null);
    }
    update(team_id, body, params = {}) {
        params["team_id"] = team_id;
        return this.createPromise("PUT", params, this.populateObjectFromJson, this.handleReject, body);
    }
}
exports.TeamUserBillingDetails = TeamUserBillingDetails;
TeamUserBillingDetails.rootElementName = "";
TeamUserBillingDetails.prefixURI = "teams/{!:team_id}/billing_details";
TeamUserBillingDetails.elementClass = team_user_billing_details_1.TeamUserBillingDetails;
//# sourceMappingURL=team_user_billing_details.js.map