import { BaseCollection } from "./base_collection.js";
import { Branch } from "../models/branch.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class Branches extends BaseCollection {
  protected static rootElementName = "branches";
  protected static rootElementNameSingular = "branch";
  protected static prefixURI = "projects/{!:project_id}/branches/{:id}";
  protected static elementClass = Branch;

  create(body: Keyable, params: StandartParams): Promise<Branch> {
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
  ): Promise<Branch> {
    params["id"] = id;
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }

  merge(
    id: string | number,
    params: StandartParams,
    body: Keyable = {}
  ): Promise<Keyable> {
    params["id"] = id;
    return this.createPromise(
      "POST",
      params,
      this.returnBareJSON,
      this.handleReject,
      body,
      "projects/{!:project_id}/branches/{:id}/merge"
    );
  }
}
