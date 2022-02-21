import { Project } from "../models/project";
import { BaseCollection } from "./base_collection";
export class Projects extends BaseCollection {
    empty(project_id) {
        return this.createPromise("PUT", { project_id: project_id }, this.returnBareJSON, this.handleReject, null, "projects/{!:project_id}/empty");
    }
}
Projects.rootElementName = "projects";
Projects.prefixURI = "projects/{:id}";
Projects.elementClass = Project;
//# sourceMappingURL=projects.js.map