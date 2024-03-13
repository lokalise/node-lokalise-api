import { Language } from "../models/language.js";
import { BaseCollection } from "./base_collection.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { BulkResult } from "../interfaces/bulk_result.js";
import { PaginationParams } from "../interfaces/pagination_params.js";
import { CreateLanguageParams } from "../types/create_language_params.js";
import { UpdateLanguageParams } from "../types/update_language_params.js";

type LanguageDeleted = {
  project_id: string;
  language_deleted: boolean;
  branch?: string;
};

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
