import { BaseCollection } from "./base_collection.js";
import { Task } from "../models/task.js";
export class Tasks extends BaseCollection {
    static rootElementName = "tasks";
    static rootElementNameSingular = "task";
    static prefixURI = "projects/{!:project_id}/tasks/{:id}";
    static elementClass = Task;
    create(body, params) {
        return this.createPromise("POST", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
//# sourceMappingURL=tasks.js.map