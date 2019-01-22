"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base_model");
class Projects extends base_model_1.BaseModel {
    empty(project_id) {
        this.createPromise('PUT', { project_id: project_id }, this.populateObjectFromJson, this.handleReject, null, 'projects/{!:project_id}/empty');
    }
}
Projects.rootElementName = 'projects';
Projects.prefixURI = 'projects/{:id}';
exports.Projects = Projects;
//# sourceMappingURL=projects.js.map