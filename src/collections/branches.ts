import { BaseCollection } from "./base_collection";
import { Branch } from "../models/branch";
import { StandartParams } from "../interfaces/standart_params";

export class Branches extends BaseCollection {
  protected static rootElementName: string = "branches";
  protected static rootElementNameSingular: string = "branch";
  protected static prefixURI: string = "projects/{!:project_id}/branches/{:id}";
  protected static elementClass: Object = Branch;

  create(body: any, params: StandartParams): Promise<any> {
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

  merge(id: any, params: StandartParams, body: any = {}): Promise<any> {
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
