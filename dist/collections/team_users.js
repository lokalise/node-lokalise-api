"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const team_user_1 = require("../models/team_user");
class TeamUsers extends base_collection_1.BaseCollection {
    update(id, body, params = {}) {
        params['id'] = id;
        return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
TeamUsers.rootElementName = 'team_users';
TeamUsers.rootElementNameSingular = 'team_user';
TeamUsers.prefixURI = 'teams/{!:team_id}/users/{:id}';
TeamUsers.elementClass = team_user_1.TeamUser;
exports.TeamUsers = TeamUsers;
//# sourceMappingURL=team_users.js.map