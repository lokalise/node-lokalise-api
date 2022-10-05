import { Language } from "../models/language.js";
import { BaseCollection } from "./base_collection.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { BulkResult } from "../interfaces/bulk_result.js";
import { PaginationParams } from "../interfaces/pagination_params.js";

type LanguageDeleted = {
  project_id: string;
  language_deleted: boolean;
};

type CreateLanguageData = {
  lang_iso: string;
  custom_iso?: string;
  custom_name?: string;
  custom_plural_forms?: string[];
};

type UpdateLanguageData = {
  lang_iso?: string;
  lang_name?: string;
  plural_forms?: string[];
};

export class Languages extends BaseCollection {
  protected static rootElementName = "languages";
  protected static rootElementNameSingular = "language";
  protected static prefixURI = "projects/{!:project_id}/languages/{:id}";
  protected static elementClass = Language;

  system_languages(
    params: PaginationParams = {}
  ): Promise<PaginatedResult<Language>> {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null,
      "system/languages"
    );
  }

  list(
    request_params: ProjectWithPagination
  ): Promise<PaginatedResult<Language>> {
    return this.doList(request_params);
  }

  create(
    raw_body: CreateLanguageData | CreateLanguageData[],
    request_params: ProjectOnly
  ): Promise<BulkResult<Language>> {
    const body = { languages: this.objToArray(raw_body) };
    return this.doCreate(body, request_params, this.populateArrayFromJsonBulk);
  }

  get(
    lang_id: string | number,
    request_params: ProjectOnly
  ): Promise<Language> {
    return this.doGet(lang_id, request_params);
  }

  update(
    lang_id: string | number,
    lang_params: UpdateLanguageData,
    request_params: ProjectOnly
  ): Promise<Language> {
    return this.doUpdate(lang_id, lang_params, request_params);
  }

  delete(
    lang_id: string | number,
    request_params: ProjectOnly
  ): Promise<LanguageDeleted> {
    return super.doDelete(lang_id, request_params);
  }
}
