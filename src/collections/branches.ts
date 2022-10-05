import { BaseCollection } from "./base_collection.js";
import { Branch } from "../models/branch.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";

type BranchParams = {
  name?: string;
};

type MergeBranchParams = {
  force_conflict_resolve_using?: string;
  target_branch_id?: number | string;
};

type BranchDeleted = {
  project_id: string;
  branch_deleted: boolean;
};

type BranchMerged = {
  project_id: string;
  branch_merged: boolean;
  branch: Branch;
  target_branch: Branch;
};

export class Branches extends BaseCollection {
  protected static rootElementName = "branches";
  protected static rootElementNameSingular = "branch";
  protected static prefixURI = "projects/{!:project_id}/branches/{:id}";
  protected static elementClass = Branch;

  list(
    request_params: ProjectWithPagination
  ): Promise<PaginatedResult<Branch>> {
    return this.doList(request_params);
  }

  create(
    branch_params: BranchParams,
    request_params: ProjectOnly
  ): Promise<Branch> {
    return this.doCreate(
      branch_params,
      request_params,
      this.populateObjectFromJsonRoot
    );
  }

  get(
    branch_id: string | number,
    request_params: ProjectOnly
  ): Promise<Branch> {
    return this.doGet(branch_id, request_params);
  }

  update(
    branch_id: string | number,
    branch_params: BranchParams,
    request_params: ProjectOnly
  ): Promise<Branch> {
    return this.doUpdate(branch_id, branch_params, request_params);
  }

  delete(
    branch_id: string | number,
    request_params: ProjectOnly
  ): Promise<BranchDeleted> {
    return this.doDelete(branch_id, request_params);
  }

  merge(
    branch_id: string | number,
    request_params: ProjectOnly,
    body: MergeBranchParams = {}
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
      "projects/{!:project_id}/branches/{:id}/merge"
    );
  }
}
