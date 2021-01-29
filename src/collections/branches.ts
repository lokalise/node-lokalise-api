import { BaseCollection } from "./base_collection";
import { Branch } from "../models/branch";
import { StandartParams } from "../interfaces/standart_params";

export class Branches extends BaseCollection {
  protected static rootElementName: string = "branches";
  protected static rootElementNameSingular: string = "branch";
  protected static prefixURI: string = "projects/{!:project_id}/branches/{:id}";
  protected static elementClass: Object = Branch;

  create(body: Object, params: StandartParams): Promise<Branch> {
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
    body: Object,
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
    body: Object = {}
  ): Promise<Object> {
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
