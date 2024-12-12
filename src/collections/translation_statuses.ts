import type { Keyable } from "../interfaces/keyable.js";
import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { TranslationStatus } from "../models/translation_status.js";
import type {
	ProjectOnly,
	ProjectWithPagination,
} from "../types/common_get_params.js";
import type {
	CreateTranslationStatusParams,
	TranslationStatusColors,
	TranslationStatusDeleted,
	UpdateTranslationStatusParams,
} from "../types/translation_statuses.js";
import { BaseCollection } from "./base_collection.js";

export class TranslationStatuses extends BaseCollection<TranslationStatus> {
	protected static prefixURI =
		"projects/{!:project_id}/custom_translation_statuses/{:id}";

	protected get elementClass(): new (
		json: Keyable,
	) => TranslationStatus {
		return TranslationStatus;
	}

	protected get rootElementName(): string {
		return "custom_translation_statuses";
	}

	protected get rootElementNameSingular(): string | null {
		return "custom_translation_status";
	}

	list(
		request_params: ProjectWithPagination,
	): Promise<PaginatedResult<TranslationStatus>> {
		return this.doList(request_params) as Promise<
			PaginatedResult<TranslationStatus>
		>;
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
			this.returnBareJSON<TranslationStatusColors>,
			{},
			"projects/{!:project_id}/custom_translation_statuses/colors",
		);
	}
}
