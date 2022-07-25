import { Language } from "../models/language.js";
import { BaseCollection } from "./base_collection.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { PaginatedResult } from "../models/paginated_result.js";
import { Keyable } from "../interfaces/keyable.js";

export class Languages extends BaseCollection {
  protected static rootElementName = "languages";
  protected static rootElementNameSingular = "language";
  protected static prefixURI = "projects/{!:project_id}/languages/{:id}";
  protected static elementClass = Language;

  system_languages(params: StandartParams): Promise<PaginatedResult> {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null,
      "system/languages"
    );
  }

  create(
    raw_body: Keyable | Keyable[],
    params: StandartParams
  ): Promise<Keyable> {
    const body: Keyable = { languages: this.objToArray(raw_body) };
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
  ): Promise<Language> {
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
