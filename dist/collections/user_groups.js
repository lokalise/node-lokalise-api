"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const user_group_1 = require("../models/user_group");
class UserGroups extends base_collection_1.BaseCollection {
    create(body, params = {}) {
        return this.createPromise('POST', params, this.populateObjectFromJson, this.handleReject, body);
    }
    add_project_to_group(team_id, group_id, body, params) {
        params = {};
        params['team_id'] = team_id;
        params['group_id'] = group_id;
        return this.createPromise('PUT', params, this.returnBareJSON, this.handleReject, body, 'teams/{!:team_id}/groups/{!:group_id}/projects/add');
    }
    remove_project_from_group(team_id, group_id, body, params) {
        params = {};
        params['team_id'] = team_id;
        params['group_id'] = group_id;
        return this.createPromise('PUT', params, this.returnBareJSON, this.handleReject, body, 'teams/{!:team_id}/groups/{!:group_id}/projects/remove');
    }
}
UserGroups.rootElementName = 'user_groups';
UserGroups.prefixURI = 'teams/{!:team_id}/groups/{:id}';
UserGroups.elementClass = user_group_1.UserGroup;
exports.UserGroups = UserGroups;
//# sourceMappingURL=user_groups.js.map