import { BaseCollection } from "./base_collection";
import { Branch } from "../models/branch";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";

export class Branches extends BaseCollection {
  protected static rootElementName: string = "branches";
  protected static rootElementNameSingular: string = "branch";
  protected static prefixURI: string = "projects/{!:project_id}/branches/{:id}";
  protected static elementClass: object = Branch;

  create(body: object, params: StandartParams): Promise<Branch> {
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
    body: object,
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
    body: object = {}
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
