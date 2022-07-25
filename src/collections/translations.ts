import { BaseCollection } from "./base_collection.js";
import { Translation } from "../models/translation.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class Translations extends BaseCollection {
  protected static rootElementName = "translations";
  protected static rootElementNameSingular = "translation";
  protected static prefixURI = "projects/{!:project_id}/translations/{:id}";
  protected static elementClass = Translation;

  update(
    id: string | number,
    body: Keyable,
    params: StandartParams
  ): Promise<Translation> {
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
