import { BaseCollection } from "./base_collection.js";
import { Task } from "../models/task.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class Tasks extends BaseCollection {
  protected static rootElementName = "tasks";
  protected static rootElementNameSingular = "task";
  protected static prefixURI = "projects/{!:project_id}/tasks/{:id}";
  protected static elementClass = Task;

  create(body: Keyable, params: StandartParams): Promise<Task> {
    return this.createPromise(
      "POST",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }

  update(
    id: string | number,
    body: Keyable,
    params: StandartParams
  ): Promise<Task> {
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
