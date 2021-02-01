import { BaseCollection } from "./base_collection";
import { Translation } from "../models/translation";
import { StandartParams } from "../interfaces/standart_params";

export class Translations extends BaseCollection {
  protected static rootElementName: string = "translations";
  protected static rootElementNameSingular: string = "translation";
  protected static prefixURI: string =
    "projects/{!:project_id}/translations/{:id}";
  protected static elementClass: object = Translation;

  update(
    id: string | number,
    body: object,
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
