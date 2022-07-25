import { BaseCollection } from "./base_collection.js";
import { TeamUser } from "../models/team_user.js";
export class TeamUsers extends BaseCollection {
    static rootElementName = "team_users";
    static rootElementNameSingular = "team_user";
    static prefixURI = "teams/{!:team_id}/users/{:id}";
    static elementClass = TeamUser;
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
//# sourceMappingURL=team_users.js.map