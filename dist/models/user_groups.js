"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base_model");
class UserGroups extends base_model_1.BaseModel {
}
UserGroups.rootElementName = 'user_groups';
UserGroups.prefixURI = 'teams/{!:team_id}/groups/{:id}';
exports.UserGroups = UserGroups;
//# sourceMappingURL=user_groups.js.map