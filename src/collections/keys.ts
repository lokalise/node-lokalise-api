import { BaseCollection } from "./base_collection";
import { Key } from "../models/key";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";

export class Keys extends BaseCollection {
  protected static rootElementName: string = "keys";
  protected static rootElementNameSingular: string = "key";
  protected static prefixURI: string = "projects/{!:project_id}/keys/{:id}";
  protected static elementClass: object = Key;

  create(
    raw_body: object | object[],
    params: StandartParams
  ): Promise<Keyable> {
    const body: object = { keys: this.objToArray(raw_body) };
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
    body: object,
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
    raw_keys: object | object[],
    params: StandartParams
  ): Promise<Keyable> {
    const keys: Object = { keys: this.objToArray(raw_keys) };
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
    const keys: Object = { keys: this.objToArray(raw_keys) };
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
