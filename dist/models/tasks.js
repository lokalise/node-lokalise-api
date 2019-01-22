"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base_model");
class Tasks extends base_model_1.BaseModel {
}
Tasks.rootElementName = 'tasks';
Tasks.prefixURI = 'projects/{!:project_id}/tasks/{:id}';
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map