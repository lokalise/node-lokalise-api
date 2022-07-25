import { BaseCollection } from "./base_collection.js";
import { Contributor } from "../models/contributor.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class Contributors extends BaseCollection {
  protected static rootElementName = "contributors";
  protected static rootElementNameSingular = "contributor";
  protected static prefixURI = "projects/{!:project_id}/contributors/{:id}";
  protected static elementClass = Contributor;

  create(
    raw_body: Keyable | Keyable[],
    params: StandartParams
  ): Promise<Contributor[]> {
    const body: Keyable = { contributors: this.objToArray(raw_body) };
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
    body: Keyable,
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
