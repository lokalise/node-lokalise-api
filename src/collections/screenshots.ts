import { BaseCollection } from "./base_collection";
import { Screenshot } from "../models/screenshot";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";

export class Screenshots extends BaseCollection {
  protected static rootElementName: string = "screenshots";
  protected static rootElementNameSingular: string = "screenshot";
  protected static prefixURI: string =
    "projects/{!:project_id}/screenshots/{:id}";
  protected static elementClass: object = Screenshot;

  create(
    raw_body: object | object[],
    params: StandartParams
  ): Promise<Keyable> {
    const body = { screenshots: this.objToArray(raw_body) };
    return this.createPromise(
      "POST",
      params,
      this.populateArrayFromJsonBulk,
      this.handleReject,
      body
    );
  }

  update(
    id: string | number,
    body: object,
    params: StandartParams
  ): Promise<Screenshot> {
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
