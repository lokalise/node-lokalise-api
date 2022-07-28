"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueuedProcesses = void 0;
const queued_process_1 = require("../models/queued_process");
const base_collection_1 = require("./base_collection");
class QueuedProcesses extends base_collection_1.BaseCollection {
    static rootElementName = "processes";
    static rootElementNameSingular = "process";
    static prefixURI = "projects/{!:project_id}/processes/{:id}";
    static elementClass = queued_process_1.QueuedProcess;
}
exports.QueuedProcesses = QueuedProcesses;
//# sourceMappingURL=queued_processes.js.map