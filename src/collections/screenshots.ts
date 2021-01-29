import { BaseCollection } from "./base_collection";
import { Screenshot } from "../models/screenshot";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";

export class Screenshots extends BaseCollection {
  protected static rootElementName: string = "screenshots";
  protected static rootElementNameSingular: string = "screenshot";
  protected static prefixURI: string =
    "projects/{!:project_id}/screenshots/{:id}";
  protected static elementClass: Object = Screenshot;

  create(
    raw_body: Object | Array<Object>,
    params: StandartParams
  ): Promise<Keyable> {
    const body = { screenshots: raw_body };
    return this.createPromise(
      "POST",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      body
    );
  }

  update(
    id: string | number,
    body: Object,
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
