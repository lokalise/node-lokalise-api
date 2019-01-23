"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const task_1 = require("../models/task");
class Tasks extends base_collection_1.BaseCollection {
}
Tasks.rootElementName = 'tasks';
Tasks.prefixURI = 'projects/{!:project_id}/tasks/{:id}';
Tasks.elementClass = task_1.Task;
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map