import { QueuedProcess } from "../models/queued_process";
import { BaseCollection } from "./base_collection";
export class QueuedProcesses extends BaseCollection {
}
QueuedProcesses.rootElementName = "processes";
QueuedProcesses.rootElementNameSingular = "process";
QueuedProcesses.prefixURI = "projects/{!:project_id}/processes/{:id}";
QueuedProcesses.elementClass = QueuedProcess;
//# sourceMappingURL=queued_processes.js.map