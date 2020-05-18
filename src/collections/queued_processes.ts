import { QueuedProcess } from "../models/queued_process";
import { BaseCollection } from "./base_collection";

export class QueuedProcesses extends BaseCollection {
  protected static rootElementName: string = "processes";
  protected static rootElementNameSingular: string = "process";
  protected static prefixURI: string =
    "projects/{!:project_id}/processes/{:id}";
  protected static elementClass: Object = QueuedProcess;
}
