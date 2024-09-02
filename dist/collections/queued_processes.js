import { QueuedProcess } from "../models/queued_process.js";
import { BaseCollection } from "./base_collection.js";
export class QueuedProcesses extends BaseCollection {
	static rootElementName = "processes";
	static rootElementNameSingular = "process";
	static prefixURI = "projects/{!:project_id}/processes/{:id}";
	static elementClass = QueuedProcess;
	list(request_params) {
		return this.doList(request_params);
	}
	get(process_id, request_params) {
		return this.doGet(process_id, request_params);
	}
}
//# sourceMappingURL=queued_processes.js.map
