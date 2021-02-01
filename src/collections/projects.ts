import { Project } from "../models/project";
import { BaseCollection } from "./base_collection";
import { Keyable } from "../interfaces/keyable";

export class Projects extends BaseCollection {
  protected static rootElementName: string = "projects";
  protected static prefixURI: string = "projects/{:id}";
  protected static elementClass: object = Project;

  empty(project_id: any): Promise<Keyable> {
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
