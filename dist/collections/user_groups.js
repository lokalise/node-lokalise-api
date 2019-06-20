"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const user_group_1 = require("../models/user_group");
class UserGroups extends base_collection_1.BaseCollection {
    create(body, params = {}) {
        return this.createPromise('POST', params, this.populateGroupFromJsonRoot, this.handleReject, body);
    }
    update(id, body, params = {}) {
        params['id'] = id;
        return this.createPromise('PUT', params, this.populateGroupFromJsonRoot, this.handleReject, body);
    }
    add_members_to_group(team_id, group_id, raw_body, params = {}) {
        params['team_id'] = team_id;
        params['group_id'] = group_id;
        const body = { users: raw_body };
        return this.createPromise('PUT', params, this.populateGroupFromJsonRoot, this.handleReject, body, 'teams/{!:team_id}/groups/{!:group_id}/members/add');
    }
    remove_members_from_group(team_id, group_id, raw_body, params = {}) {
        params['team_id'] = team_id;
        params['group_id'] = group_id;
        const body = { users: raw_body };
        return this.createPromise('PUT', params, this.populateGroupFromJsonRoot, this.handleReject, body, 'teams/{!:team_id}/groups/{!:group_id}/members/remove');
    }
    add_projects_to_group(team_id, group_id, raw_body, params = {}) {
        params['team_id'] = team_id;
        params['group_id'] = group_id;
        const body = { projects: raw_body };
        return this.createPromise('PUT', params, this.populateGroupFromJsonRoot, this.handleReject, body, 'teams/{!:team_id}/groups/{!:group_id}/projects/add');
    }
    remove_projects_from_group(team_id, group_id, raw_body, params = {}) {
        params['team_id'] = team_id;
        params['group_id'] = group_id;
        const body = { projects: raw_body };
        return this.createPromise('PUT', params, this.populateGroupFromJsonRoot, this.handleReject, body, 'teams/{!:team_id}/groups/{!:group_id}/projects/remove');
    }
    populateGroupFromJsonRoot(json) {
        json = json['group'];
        return this.populateObjectFromJson(json);
    }
}
UserGroups.rootElementName = 'user_groups';
UserGroups.prefixURI = 'teams/{!:team_id}/groups/{:id}';
UserGroups.elementClass = user_group_1.UserGroup;
exports.UserGroups = UserGroups;
//# sourceMappingURL=user_groups.js.map