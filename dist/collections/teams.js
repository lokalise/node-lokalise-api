import { BaseCollection } from "./base_collection.js";
import { Team } from "../models/team.js";
class Teams extends BaseCollection {
    static rootElementName = "teams";
    static prefixURI = "teams";
    static elementClass = Team;
    list(request_params = {}) {
        return this.doList(request_params);
    }
}
export { Teams };
//# sourceMappingURL=teams.js.map