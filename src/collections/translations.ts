import { BaseCollection } from "./base_collection.js";
import { Translation } from "../models/translation.js";
import { CursorPaginatedResult } from "../interfaces/cursor_paginated_result.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type {
  UpdateTranslationParams,
  ListTranslationParams,
  GetTranslationParams,
} from "../types/translations.js";

export class Translations extends BaseCollection {
  protected static rootElementName = "translations";
  protected static rootElementNameSingular = "translation";
  protected static prefixURI = "projects/{!:project_id}/translations/{:id}";
  protected static elementClass = Translation;

  list(
    request_params: ListTranslationParams,
  ): Promise<CursorPaginatedResult<Translation>> {
    return this.doListCursor(request_params);
  }

  get(
    translation_id: string | number,
    request_params: GetTranslationParams,
  ): Promise<Translation> {
    return this.doGet(translation_id, request_params);
  }

  update(
    translation_id: string | number,
    translation_params: UpdateTranslationParams,
    request_params: ProjectOnly,
  ): Promise<Translation> {
    return this.doUpdate(translation_id, translation_params, request_params);
  }
}
