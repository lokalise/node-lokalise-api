import { QueuedProcess } from "../models/queued_process.js";
import { BaseCollection } from "./base_collection.js";
export class QueuedProcesses extends BaseCollection {
    static rootElementName = "processes";
    static rootElementNameSingular = "process";
    static prefixURI = "projects/{!:project_id}/processes/{:id}";
    static elementClass = QueuedProcess;
}
//# sourceMappingURL=queued_processes.js.map