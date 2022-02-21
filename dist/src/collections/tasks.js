import { BaseCollection } from "./base_collection";
import { Task } from "../models/task";
export class Tasks extends BaseCollection {
    create(body, params) {
        return this.createPromise("POST", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
Tasks.rootElementName = "tasks";
Tasks.rootElementNameSingular = "task";
Tasks.prefixURI = "projects/{!:project_id}/tasks/{:id}";
Tasks.elementClass = Task;
//# sourceMappingURL=tasks.js.map