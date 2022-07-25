import { BaseCollection } from "./base_collection.js";
import { Key } from "../models/key.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class Keys extends BaseCollection {
  protected static rootElementName = "keys";
  protected static rootElementNameSingular = "key";
  protected static prefixURI = "projects/{!:project_id}/keys/{:id}";
  protected static elementClass = Key;

  create(
    raw_body: Keyable | Keyable[],
    params: StandartParams
  ): Promise<Keyable> {
    const body: Keyable = { keys: this.objToArray(raw_body) };
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
  ): Promise<Key> {
    params["id"] = id;
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }

  bulk_update(
    raw_keys: Keyable | Keyable[],
    params: StandartParams
  ): Promise<Keyable> {
    const keys: Keyable = { keys: this.objToArray(raw_keys) };
    return this.createPromise(
      "PUT",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      keys,
      "projects/{!:project_id}/keys"
    );
  }

  bulk_delete(
    raw_keys: number[] | string[],
    params: StandartParams
  ): Promise<Keyable> {
    const keys: Keyable = { keys: this.objToArray(raw_keys) };
    return this.createPromise(
      "DELETE",
      params,
      this.returnBareJSON,
      this.handleReject,
      keys,
      "projects/{!:project_id}/keys"
    );
  }
}
