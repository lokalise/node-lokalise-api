"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../http_client/base");
class Projects {
    list() {
        let response = new base_1.ApiRequest('projects', 'get');
    }
    get(id) {
        let response = new base_1.ApiRequest('projects', 'get', { id: id });
    }
}
exports.Projects = Projects;
//# sourceMappingURL=projects.js.map