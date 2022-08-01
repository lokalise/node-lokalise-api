"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
const project_1 = require("../models/project");
const base_collection_1 = require("./base_collection");
class Projects extends base_collection_1.BaseCollection {
    static rootElementName = "projects";
    static prefixURI = "projects/{:id}";
    static elementClass = project_1.Project;
    list(request_params = {}) {
        return this.doList(request_params);
    }
    create(project_params) {
        return this.doCreate(project_params);
    }
    get(project_id) {
        return this.doGet(project_id);
    }
    update(project_id, project_params) {
        return this.doUpdate(project_id, project_params, {}, this.populateObjectFromJson);
    }
    delete(project_id) {
        return this.doDelete(project_id);
    }
    empty(project_id) {
        return this.createPromise("PUT", { project_id: project_id }, this.returnBareJSON, this.handleReject, null, "projects/{!:project_id}/empty");
    }
}
exports.Projects = Projects;
//# sourceMappingURL=projects.js.map