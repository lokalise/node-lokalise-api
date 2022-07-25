import { Project } from "../models/project.js";
import { BaseCollection } from "./base_collection.js";
export class Projects extends BaseCollection {
    static rootElementName = "projects";
    static prefixURI = "projects/{:id}";
    static elementClass = Project;
    empty(project_id) {
        return this.createPromise("PUT", { project_id: project_id }, this.returnBareJSON, this.handleReject, null, "projects/{!:project_id}/empty");
    }
}
//# sourceMappingURL=projects.js.map