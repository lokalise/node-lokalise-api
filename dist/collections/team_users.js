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
    list(request_params) {
        return this.doList(request_params);
    }
    get(team_user_id, request_params) {
        return this.doGet(team_user_id, request_params);
    }
    update(team_user_id, team_user_params, request_params) {
        return this.doUpdate(team_user_id, team_user_params, request_params);
    }
    delete(team_user_id, request_params) {
        return this.doDelete(team_user_id, request_params);
    }
}
exports.TeamUsers = TeamUsers;
//# sourceMappingURL=team_users.js.map