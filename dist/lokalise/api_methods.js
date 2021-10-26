"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokaliseApiMethods = void 0;
const Collections = require("../collections/index");
class LokaliseApiMethods {
    constructor() {
        // TODO: Lazy loading
        this.userGroups = new Collections.UserGroups();
        this.webhooks = new Collections.Webhooks();
    }
}
exports.LokaliseApiMethods = LokaliseApiMethods;
//# sourceMappingURL=api_methods.js.map