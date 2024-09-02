import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Branch } from "../models/branch.js";
import type {
	BranchDeleted,
	BranchMerged,
	BranchParams,
	MergeBranchParams,
} from "../types/branches.js";
import type {
	ProjectOnly,
	ProjectWithPagination,
} from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";

export class Branches extends BaseCollection {
	protected static rootElementName = "branches";
	protected static rootElementNameSingular = "branch";
	protected static prefixURI = "projects/{!:project_id}/branches/{:id}";
	protected static elementClass = Branch;

	list(
		request_params: ProjectWithPagination,
	): Promise<PaginatedResult<Branch>> {
		return this.doList(request_params);
	}

	create(
		branch_params: BranchParams,
		request_params: ProjectOnly,
	): Promise<Branch> {
		return this.doCreate(
			branch_params,
			request_params,
			this.populateObjectFromJsonRoot,
		);
	}

	get(
		branch_id: string | number,
		request_params: ProjectOnly,
	): Promise<Branch> {
		return this.doGet(branch_id, request_params);
	}

	update(
		branch_id: string | number,
		branch_params: BranchParams,
		request_params: ProjectOnly,
	): Promise<Branch> {
		return this.doUpdate(branch_id, branch_params, request_params);
	}

	delete(
		branch_id: string | number,
		request_params: ProjectOnly,
	): Promise<BranchDeleted> {
		return this.doDelete(branch_id, request_params);
	}

	merge(
		branch_id: string | number,
		request_params: ProjectOnly,
		body: MergeBranchParams = {},
	): Promise<BranchMerged> {
		const params = {
			...request_params,
			...{ id: branch_id },
		};

		return this.createPromise(
			"POST",
			params,
			this.returnBareJSON,
			this.handleReject,
			body,
			"projects/{!:project_id}/branches/{:id}/merge",
		);
	}
}
