"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Models = require("../models/index");
class LocaliseApiMethods {
    constructor() {
        // TODO: Lazy loading
        this.comments = new Models.Comments();
        this.contributors = new Models.Contributors();
        this.files = new Models.Files();
        this.keys = new Models.Keys();
        this.languages = new Models.Languages();
        this.projects = new Models.Projects();
        this.screenshots = new Models.Screenshots();
        this.snapshots = new Models.Snapshots();
        this.tasks = new Models.Tasks();
        this.teamUsers = new Models.TeamUsers();
        this.userGroups = new Models.UserGroups();
        this.translations = new Models.Translations();
    }
}
exports.LocaliseApiMethods = LocaliseApiMethods;
//# sourceMappingURL=api_methods.js.map