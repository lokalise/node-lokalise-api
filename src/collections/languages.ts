import { Language } from "../models/language.js";
import { BaseCollection } from "./base_collection.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { BulkResult } from "../interfaces/bulk_result.js";
import type {
  ProjectWithPagination,
  ProjectOnly,
  PaginationParams,
} from "../types/common_get_params.js";
import type {
  CreateLanguageParams,
  UpdateLanguageParams,
  LanguageDeleted,
} from "../types/languages.js";

export class Languages extends BaseCollection {
  protected static rootElementName = "languages";
  protected static rootElementNameSingular = "language";
  protected static prefixURI = "projects/{!:project_id}/languages/{:id}";
  protected static elementClass = Language;

  system_languages(
    params: PaginationParams = {},
  ): Promise<PaginatedResult<Language>> {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null,
      "system/languages",
    );
  }

  list(
    request_params: ProjectWithPagination,
  ): Promise<PaginatedResult<Language>> {
    return this.doList(request_params);
  }

  create(
    raw_body: CreateLanguageParams | CreateLanguageParams[],
    request_params: ProjectOnly,
  ): Promise<BulkResult<Language>> {
    const body = { languages: this.objToArray(raw_body) };
    return this.doCreate(body, request_params, this.populateArrayFromJsonBulk);
  }

  get(
    lang_id: string | number,
    request_params: ProjectOnly,
  ): Promise<Language> {
    return this.doGet(lang_id, request_params);
  }

  update(
    lang_id: string | number,
    lang_params: UpdateLanguageParams,
    request_params: ProjectOnly,
  ): Promise<Language> {
    return this.doUpdate(lang_id, lang_params, request_params);
  }

  delete(
    lang_id: string | number,
    request_params: ProjectOnly,
  ): Promise<LanguageDeleted> {
    return super.doDelete(lang_id, request_params);
  }
}
