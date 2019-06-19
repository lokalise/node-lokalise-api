"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("../models/project");
const base_collection_1 = require("./base_collection");
class Projects extends base_collection_1.BaseCollection {
    empty(project_id) {
        return this.createPromise('PUT', { project_id: project_id }, this.populateObjectFromJson, this.handleReject, null, 'projects/{!:project_id}/empty');
    }
}
Projects.rootElementName = 'projects';
Projects.prefixURI = 'projects/{:id}';
Projects.elementClass = project_1.Project;
exports.Projects = Projects;
//# sourceMappingURL=projects.js.map