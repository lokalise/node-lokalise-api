"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamUsers = void 0;
const base_collection_1 = require("./base_collection");
const team_user_1 = require("../models/team_user");
class TeamUsers extends base_collection_1.BaseCollection {
    static rootElementName = "team_users";
    static rootElementNameSingular = "team_user";
    static prefixURI = "teams/{!:team_id}/users/{:id}";
    static elementClass = team_user_1.TeamUser;
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
exports.TeamUsers = TeamUsers;
//# sourceMappingURL=team_users.js.map