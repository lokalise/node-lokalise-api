import type { Keyable } from "../interfaces/keyable.js";
import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Contributor } from "../models/contributor.js";
import type {
	ProjectOnly,
	ProjectWithPagination,
} from "../types/common_get_params.js";
import type {
	ContributorCreateData,
	ContributorDeleted,
	ContributorUpdateData,
} from "../types/contributors.js";
import { BaseCollection } from "./base_collection.js";

export class Contributors extends BaseCollection<Contributor> {
	protected static override prefixURI =
		"projects/{!:project_id}/contributors/{:id}";

	protected get elementClass(): new (
		json: Keyable,
	) => Contributor {
		return Contributor;
	}

	protected override get rootElementName(): string {
		return "contributors";
	}

	protected override get rootElementNameSingular(): string | null {
		return "contributor";
	}

	list(
		request_params: ProjectWithPagination,
	): Promise<PaginatedResult<Contributor>> {
		return this.doList(request_params) as Promise<PaginatedResult<Contributor>>;
	}

	create(
		contributor_params: ContributorCreateData | ContributorCreateData[],
		request_params: ProjectOnly,
	): Promise<Contributor[]> {
		const body = { contributors: this.objToArray(contributor_params) };

		return this.doCreateArray(body, request_params);
	}

	get(
		contributor_id: string | number,
		request_params: ProjectOnly,
	): Promise<Contributor> {
		return this.doGet(contributor_id, request_params);
	}

	update(
		contributor_id: string | number,
		contributor_params: ContributorUpdateData,
		request_params: ProjectOnly,
	): Promise<Contributor> {
		return this.doUpdate(contributor_id, contributor_params, request_params);
	}

	delete(
		contributor_id: string | number,
		request_params: ProjectOnly,
	): Promise<ContributorDeleted> {
		return this.doDelete(contributor_id, request_params);
	}
}
