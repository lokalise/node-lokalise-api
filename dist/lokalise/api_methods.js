"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collectons = require("../collections/index");
class LocaliseApiMethods {
    constructor() {
        // TODO: Lazy loading
        this.comments = new Collectons.Comments();
        this.contributors = new Collectons.Contributors();
        this.files = new Collectons.Files();
        this.keys = new Collectons.Keys();
        this.languages = new Collectons.Languages();
        this.projects = new Collectons.Projects();
        this.screenshots = new Collectons.Screenshots();
        this.snapshots = new Collectons.Snapshots();
        this.tasks = new Collectons.Tasks();
        this.teamUsers = new Collectons.TeamUsers();
        this.userGroups = new Collectons.UserGroups();
        this.translations = new Collectons.Translations();
    }
}
exports.LocaliseApiMethods = LocaliseApiMethods;
//# sourceMappingURL=api_methods.js.map