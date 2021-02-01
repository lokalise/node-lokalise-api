import { BaseCollection } from "./base_collection";
import { Snapshot } from "../models/snapshot";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";

export class Snapshots extends BaseCollection {
  protected static rootElementName: string = "snapshots";
  protected static rootElementNameSingular: string = "snapshot";
  protected static prefixURI: string =
    "projects/{!:project_id}/snapshots/{:id}";
  protected static elementClass: object = Snapshot;

  restore(id: string | number, params: StandartParams): Promise<Keyable> {
    params["id"] = id;
    return this.createPromise(
      "POST",
      params,
      this.returnBareJSON,
      this.handleReject,
      {}
    );
  }

  create(body: object, params: StandartParams): Promise<Snapshot> {
    return this.createPromise(
      "POST",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }
}
