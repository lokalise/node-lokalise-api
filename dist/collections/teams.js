import { Team } from "../models/team.js";
import { BaseCollection } from "./base_collection.js";
export class Teams extends BaseCollection {
    static rootElementName = "teams";
    static prefixURI = "teams";
    static elementClass = Team;
    list(request_params = {}) {
        return this.doList(request_params);
    }
}
//# sourceMappingURL=teams.js.map