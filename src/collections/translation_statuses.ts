import { BaseCollection } from "./base_collection.js";
import { TranslationStatus } from "../models/translation_status.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import type {
  ProjectOnly,
  ProjectWithPagination,
} from "../types/common_get_params.js";
import type {
  CreateTranslationStatusParams,
  UpdateTranslationStatusParams,
  TranslationStatusDeleted,
  TranslationStatusColors,
} from "../types/translation_statuses.js";

export class TranslationStatuses extends BaseCollection {
  protected static rootElementName = "custom_translation_statuses";
  protected static prefixURI =
    "projects/{!:project_id}/custom_translation_statuses/{:id}";
  protected static elementClass = TranslationStatus;
  protected static rootElementNameSingular = "custom_translation_status";

  list(
    request_params: ProjectWithPagination,
  ): Promise<PaginatedResult<TranslationStatus>> {
    return this.doList(request_params);
  }

  create(
    translation_status_params: CreateTranslationStatusParams,
    request_params: ProjectOnly,
  ): Promise<TranslationStatus> {
    return this.doCreate(
      translation_status_params,
      request_params,
      this.populateObjectFromJsonRoot,
    );
  }

  get(
    translation_status_id: string | number,
    request_params: ProjectOnly,
  ): Promise<TranslationStatus> {
    return this.doGet(translation_status_id, request_params);
  }

  update(
    translation_status_id: string | number,
    translation_status_params: UpdateTranslationStatusParams,
    request_params: ProjectOnly,
  ): Promise<TranslationStatus> {
    return this.doUpdate(
      translation_status_id,
      translation_status_params,
      request_params,
    );
  }

  delete(
    translation_status_id: string | number,
    request_params: ProjectOnly,
  ): Promise<TranslationStatusDeleted> {
    return this.doDelete(translation_status_id, request_params);
  }

  available_colors(
    request_params: ProjectOnly,
  ): Promise<TranslationStatusColors> {
    return this.createPromise(
      "GET",
      request_params,
      this.returnBareJSON,
      this.handleReject,
      {},
      "projects/{!:project_id}/custom_translation_statuses/colors",
    );
  }
}
