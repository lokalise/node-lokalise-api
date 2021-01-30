import { BaseCollection } from "./base_collection";
import { Contributor } from "../models/contributor";
import { StandartParams } from "../interfaces/standart_params";

export class Contributors extends BaseCollection {
  protected static rootElementName: string = "contributors";
  protected static rootElementNameSingular: string = "contributor";
  protected static prefixURI: string =
    "projects/{!:project_id}/contributors/{:id}";
  protected static elementClass: object = Contributor;

  create(
    raw_body: object | object[],
    params: StandartParams
  ): Promise<Contributor[]> {
    const body: object = { contributors: this.objToArray(raw_body) };
    return this.createPromise(
      "POST",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      body,
      "projects/{!:project_id}/contributors"
    );
  }

  update(
    id: string | number,
    body: object,
    params: StandartParams
  ): Promise<Contributor> {
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
