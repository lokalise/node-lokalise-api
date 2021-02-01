"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
const project_1 = require("../models/project");
const base_collection_1 = require("./base_collection");
class Projects extends base_collection_1.BaseCollection {
    empty(project_id) {
        return this.createPromise("PUT", { project_id: project_id }, this.returnBareJSON, this.handleReject, null, "projects/{!:project_id}/empty");
    }
}
exports.Projects = Projects;
Projects.rootElementName = "projects";
Projects.prefixURI = "projects/{:id}";
Projects.elementClass = project_1.Project;
//# sourceMappingURL=projects.js.map