"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = void 0;
const base_collection_1 = require("./base_collection");
const task_1 = require("../models/task");
class Tasks extends base_collection_1.BaseCollection {
    static rootElementName = "tasks";
    static rootElementNameSingular = "task";
    static prefixURI = "projects/{!:project_id}/tasks/{:id}";
    static elementClass = task_1.Task;
    create(body, params) {
        return this.createPromise("POST", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    update(id, body, params) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
}
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map