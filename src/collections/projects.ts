import { Project } from "../models/project.js";
import { BaseCollection } from "./base_collection.js";
import { Keyable } from "../interfaces/keyable.js";

export class Projects extends BaseCollection {
  protected static rootElementName = "projects";
  protected static prefixURI = "projects/{:id}";
  protected static elementClass = Project;

  empty(project_id: string): Promise<Keyable> {
    return this.createPromise(
      "PUT",
      { project_id: project_id },
      this.returnBareJSON,
      this.handleReject,
      null,
      "projects/{!:project_id}/empty"
    );
  }
}
