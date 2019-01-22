"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base_model");
class TeamUsers extends base_model_1.BaseModel {
}
TeamUsers.rootElementName = 'team_users';
TeamUsers.prefixURI = 'teams/{!:team_id}/users/{:id}';
exports.TeamUsers = TeamUsers;
//# sourceMappingURL=team_users.js.map