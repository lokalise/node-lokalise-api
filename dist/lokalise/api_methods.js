"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collections = require("../collections/index");
class LocaliseApiMethods {
    constructor() {
        // TODO: Lazy loading
        this.comments = new Collections.Comments();
        this.contributors = new Collections.Contributors();
        this.files = new Collections.Files();
        this.keys = new Collections.Keys();
        this.languages = new Collections.Languages();
        this.projects = new Collections.Projects();
        this.screenshots = new Collections.Screenshots();
        this.snapshots = new Collections.Snapshots();
        this.tasks = new Collections.Tasks();
        this.teams = new Collections.Teams();
        this.teamUsers = new Collections.TeamUsers();
        this.translationProviders = new Collections.TranslationProviders();
        this.translations = new Collections.Translations();
        this.userGroups = new Collections.UserGroups();
    }
}
exports.LocaliseApiMethods = LocaliseApiMethods;
//# sourceMappingURL=api_methods.js.map