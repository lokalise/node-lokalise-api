import { Project } from "../models/project.js";
import { BaseCollection } from "./base_collection.js";
class Projects extends BaseCollection {
    static rootElementName = "projects";
    static prefixURI = "projects/{:id}";
    static elementClass = Project;
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
export { Projects };
//# sourceMappingURL=projects.js.map