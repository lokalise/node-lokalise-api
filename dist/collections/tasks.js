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
    list(request_params) {
        return this.doList(request_params);
    }
    create(task_params, request_params) {
        return this.doCreate(task_params, request_params, this.populateObjectFromJsonRoot);
    }
    get(task_id, request_params) {
        return this.doGet(task_id, request_params);
    }
    update(task_id, task_params, request_params) {
        return this.doUpdate(task_id, task_params, request_params);
    }
    delete(task_id, request_params) {
        return this.doDelete(task_id, request_params);
    }
}
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map