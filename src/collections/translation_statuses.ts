import { BaseCollection } from "./base_collection";
import { TranslationStatus } from "../models/translation_status";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";

export class TranslationStatuses extends BaseCollection {
  protected static rootElementName: string = "custom_translation_statuses";
  protected static prefixURI: string =
    "projects/{!:project_id}/custom_translation_statuses/{:id}";
  protected static elementClass: object = TranslationStatus;
  protected static rootElementNameSingular: string =
    "custom_translation_status";

  create(body: object, params: StandartParams): Promise<TranslationStatus> {
    return this.createPromise(
      "POST",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }

  update(
    id: string | number,
    body: object,
    params: StandartParams
  ): Promise<TranslationStatus> {
    params["id"] = id;
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      body
    );
  }

  available_colors(params: StandartParams): Promise<Keyable> {
    return this.createPromise(
      "GET",
      params,
      this.returnBareJSON,
      this.handleReject,
      {},
      "projects/{!:project_id}/custom_translation_statuses/colors"
    );
  }
}
