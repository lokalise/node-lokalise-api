import { BaseCollection } from "./base_collection.js";
import { Screenshot } from "../models/screenshot.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class Screenshots extends BaseCollection {
  protected static rootElementName = "screenshots";
  protected static rootElementNameSingular = "screenshot";
  protected static prefixURI = "projects/{!:project_id}/screenshots/{:id}";
  protected static elementClass = Screenshot;

  create(
    raw_body: Keyable | Keyable[],
    params: StandartParams
  ): Promise<Keyable> {
    const body = { screenshots: this.objToArray(raw_body) };
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
    body: Keyable,
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
