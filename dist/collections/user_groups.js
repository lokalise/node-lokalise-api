import { BaseCollection } from "./base_collection.js";
import { UserGroup } from "../models/user_group.js";
class UserGroups extends BaseCollection {
    static rootElementName = "user_groups";
    static prefixURI = "teams/{!:team_id}/groups/{:id}";
    static elementClass = UserGroup;
    list(request_params) {
        return this.doList(request_params);
    }
    create(user_group_params, request_params) {
        return this.doCreate(user_group_params, request_params, this.populateGroupFromJsonRoot);
    }
    get(user_group_id, request_params) {
        return this.doGet(user_group_id, request_params);
    }
    update(user_group_id, user_group_params, request_params) {
        return this.doUpdate(user_group_id, user_group_params, request_params, this.populateGroupFromJsonRoot);
    }
    delete(user_group_id, request_params) {
        return this.doDelete(user_group_id, request_params);
    }
    add_members_to_group(team_id, group_id, user_ids) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { users: user_ids };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/members/add");
    }
    remove_members_from_group(team_id, group_id, user_ids) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { users: user_ids };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/members/remove");
    }
    add_projects_to_group(team_id, group_id, project_ids) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { projects: project_ids };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/projects/add");
    }
    remove_projects_from_group(team_id, group_id, project_ids) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { projects: project_ids };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/projects/remove");
    }
    populateGroupFromJsonRoot(json, headers) {
        const formatted_json = json["group"];
        return this.populateObjectFromJson(formatted_json, headers);
    }
}
export { UserGroups };
//# sourceMappingURL=user_groups.js.map