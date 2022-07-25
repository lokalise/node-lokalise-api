import { BaseCollection } from "./base_collection.js";
import { TranslationStatus } from "../models/translation_status.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class TranslationStatuses extends BaseCollection {
  protected static rootElementName = "custom_translation_statuses";
  protected static prefixURI =
    "projects/{!:project_id}/custom_translation_statuses/{:id}";
  protected static elementClass = TranslationStatus;
  protected static rootElementNameSingular = "custom_translation_status";

  create(body: Keyable, params: StandartParams): Promise<TranslationStatus> {
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
    body: Keyable,
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
