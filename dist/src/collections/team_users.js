import { BaseCollection } from "./base_collection";
import { TeamUser } from "../models/team_user";
export class TeamUsers extends BaseCollection {
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
TeamUsers.rootElementName = "team_users";
TeamUsers.rootElementNameSingular = "team_user";
TeamUsers.prefixURI = "teams/{!:team_id}/users/{:id}";
TeamUsers.elementClass = TeamUser;
//# sourceMappingURL=team_users.js.map