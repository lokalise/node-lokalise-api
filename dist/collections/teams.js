"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const team_1 = require("../models/team");
class Teams extends base_collection_1.BaseCollection {
}
Teams.rootElementName = 'teams';
Teams.prefixURI = 'teams';
Teams.elementClass = team_1.Team;
exports.Teams = Teams;
//# sourceMappingURL=teams.js.map