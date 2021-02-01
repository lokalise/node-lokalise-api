import { BaseCollection } from "./base_collection";
import { Task } from "../models/task";
import { StandartParams } from "../interfaces/standart_params";

export class Tasks extends BaseCollection {
  protected static rootElementName: string = "tasks";
  protected static rootElementNameSingular: string = "task";
  protected static prefixURI: string = "projects/{!:project_id}/tasks/{:id}";
  protected static elementClass: object = Task;

  create(body: object, params: StandartParams): Promise<Task> {
    return this.createPromise(
      "POST",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }

  update(id: any, body: any, params: StandartParams): Promise<any> {
    params["id"] = id;
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }
}
