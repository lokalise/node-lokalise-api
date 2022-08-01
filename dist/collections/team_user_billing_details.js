"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamUserBillingDetails = void 0;
const team_user_billing_details_1 = require("../models/team_user_billing_details");
const base_collection_1 = require("./base_collection");
class TeamUserBillingDetails extends base_collection_1.BaseCollection {
    static rootElementName = "";
    static prefixURI = "teams/{!:team_id}/billing_details";
    static elementClass = team_user_billing_details_1.TeamUserBillingDetails;
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
exports.TeamUserBillingDetails = TeamUserBillingDetails;
//# sourceMappingURL=team_user_billing_details.js.map