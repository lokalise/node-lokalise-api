"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
const project_1 = require("../models/project");
const base_collection_1 = require("./base_collection");
class Projects extends base_collection_1.BaseCollection {
    static rootElementName = "projects";
    static prefixURI = "projects/{:id}";
    static elementClass = project_1.Project;
    empty(project_id) {
        return this.createPromise("PUT", { project_id: project_id }, this.returnBareJSON, this.handleReject, null, "projects/{!:project_id}/empty");
    }
}
exports.Projects = Projects;
//# sourceMappingURL=projects.js.map