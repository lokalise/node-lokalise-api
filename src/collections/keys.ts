import { BaseCollection } from "./base_collection";
import { Key } from "../models/key";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";

export class Keys extends BaseCollection {
  protected static rootElementName: string = "keys";
  protected static rootElementNameSingular: string = "key";
  protected static prefixURI: string = "projects/{!:project_id}/keys/{:id}";
  protected static elementClass: Object = Key;

  create(
    raw_body: Object | Array<Object>,
    params: StandartParams
  ): Promise<Keyable> {
    const body: Object = { keys: raw_body };
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
    raw_keys: Object | Array<Object>,
    params: StandartParams
  ): Promise<Keyable> {
    const keys: Object = { keys: raw_keys };
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
    const keys: Object = { keys: raw_keys };
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
