import { BaseCollection } from "./base_collection.js";
import { Snapshot } from "../models/snapshot.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class Snapshots extends BaseCollection {
  protected static rootElementName = "snapshots";
  protected static rootElementNameSingular = "snapshot";
  protected static prefixURI = "projects/{!:project_id}/snapshots/{:id}";
  protected static elementClass = Snapshot;

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

  create(body: Keyable, params: StandartParams): Promise<Snapshot> {
    return this.createPromise(
      "POST",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }
}
