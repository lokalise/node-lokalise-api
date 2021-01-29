import { Language } from "../models/language";
import { BaseCollection } from "./base_collection";
import { StandartParams } from "../interfaces/standart_params";
import { PaginatedResult } from "../models/paginated_result";
import { Keyable } from "../interfaces/keyable";

export class Languages extends BaseCollection {
  protected static rootElementName: string = "languages";
  protected static rootElementNameSingular: string = "language";
  protected static prefixURI: string =
    "projects/{!:project_id}/languages/{:id}";
  protected static elementClass: Object = Language;

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
    raw_body: Object | Array<Object>,
    params: StandartParams
  ): Promise<Keyable> {
    const body: Object = { languages: raw_body };
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
