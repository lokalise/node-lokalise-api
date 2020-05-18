"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teams = void 0;
const base_collection_1 = require("./base_collection");
const team_1 = require("../models/team");
let Teams = /** @class */ (() => {
    class Teams extends base_collection_1.BaseCollection {
    }
    Teams.rootElementName = "teams";
    Teams.prefixURI = "teams";
    Teams.elementClass = team_1.Team;
    return Teams;
})();
exports.Teams = Teams;
//# sourceMappingURL=teams.js.map