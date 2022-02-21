import { BaseCollection } from "./base_collection";
import { UserGroup } from "../models/user_group";
export class UserGroups extends BaseCollection {
    create(body, params) {
        return this.createPromise("POST", params, this.populateGroupFromJsonRoot, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body);
    }
    add_members_to_group(team_id, group_id, raw_body) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { users: raw_body };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/members/add");
    }
    remove_members_from_group(team_id, group_id, raw_body) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { users: raw_body };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/members/remove");
    }
    add_projects_to_group(team_id, group_id, raw_body) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { projects: raw_body };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/projects/add");
    }
    remove_projects_from_group(team_id, group_id, raw_body) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { projects: raw_body };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/projects/remove");
    }
    populateGroupFromJsonRoot(json, headers) {
        const formatted_json = json["group"];
        return this.populateObjectFromJson(formatted_json, headers);
    }
}
UserGroups.rootElementName = "user_groups";
UserGroups.prefixURI = "teams/{!:team_id}/groups/{:id}";
UserGroups.elementClass = UserGroup;
//# sourceMappingURL=user_groups.js.map