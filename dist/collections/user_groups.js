"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const user_group_1 = require("../models/user_group");
class UserGroups extends base_collection_1.BaseCollection {
}
UserGroups.rootElementName = 'user_groups';
UserGroups.prefixURI = 'teams/{!:team_id}/groups/{:id}';
UserGroups.elementClass = user_group_1.UserGroup;
exports.UserGroups = UserGroups;
//# sourceMappingURL=user_groups.js.map