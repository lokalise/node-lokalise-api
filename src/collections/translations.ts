import { BaseCollection } from "./base_collection";
import { Translation } from "../models/translation";
import { PaginatedResult } from "../interfaces/paginated_result";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";
import { ProjectOnly } from "../interfaces/project_only";

interface ListTranslationParams extends ProjectWithPagination {
  disable_references?: number | string;
  filter_lang_id?: number | string;
  filter_is_reviewed?: number | string;
  filter_unverified?: number | string;
  filter_untranslated?: number | string;
  filter_qa_issues?: string;
  filter_active_task_id?: number | string;
}

interface GetTranslationParams extends ProjectOnly {
  disable_references?: number | string;
}

type TranslationParams = {
  translation: string;
  is_unverified?: boolean;
  is_reviewed?: boolean;
  custom_translation_status_ids?: string[] | number[];
};

export class Translations extends BaseCollection {
  protected static rootElementName = "translations";
  protected static rootElementNameSingular = "translation";
  protected static prefixURI = "projects/{!:project_id}/translations/{:id}";
  protected static elementClass = Translation;

  list(
    request_params: ListTranslationParams
  ): Promise<PaginatedResult<Translation>> {
    return this.doList(request_params);
  }

  get(
    translation_id: string | number,
    request_params: GetTranslationParams
  ): Promise<Translation> {
    return this.doGet(translation_id, request_params);
  }

  update(
    translation_id: string | number,
    translation_params: TranslationParams,
    request_params: ProjectOnly
  ): Promise<Translation> {
    return this.doUpdate(translation_id, translation_params, request_params);
  }
}
