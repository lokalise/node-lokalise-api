"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueuedProcesses = void 0;
const queued_process_1 = require("../models/queued_process");
const base_collection_1 = require("./base_collection");
class QueuedProcesses extends base_collection_1.BaseCollection {
}
exports.QueuedProcesses = QueuedProcesses;
QueuedProcesses.rootElementName = "processes";
QueuedProcesses.rootElementNameSingular = "process";
QueuedProcesses.prefixURI = "projects/{!:project_id}/processes/{:id}";
QueuedProcesses.elementClass = queued_process_1.QueuedProcess;
//# sourceMappingURL=queued_processes.js.map