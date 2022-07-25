import { QueuedProcess } from "../models/queued_process.js";
import { BaseCollection } from "./base_collection.js";

export class QueuedProcesses extends BaseCollection {
  protected static rootElementName = "processes";
  protected static rootElementNameSingular = "process";
  protected static prefixURI = "projects/{!:project_id}/processes/{:id}";
  protected static elementClass = QueuedProcess;
}
