"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teams = void 0;
const base_collection_1 = require("./base_collection");
const team_1 = require("../models/team");
class Teams extends base_collection_1.BaseCollection {
    static rootElementName = "teams";
    static prefixURI = "teams";
    static elementClass = team_1.Team;
}
exports.Teams = Teams;
//# sourceMappingURL=teams.js.map