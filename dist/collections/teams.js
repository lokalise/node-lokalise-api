import { BaseCollection } from "./base_collection.js";
import { Team } from "../models/team.js";
export class Teams extends BaseCollection {
    static rootElementName = "teams";
    static prefixURI = "teams";
    static elementClass = Team;
}
//# sourceMappingURL=teams.js.map