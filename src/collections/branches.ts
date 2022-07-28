import { BaseCollection } from "./base_collection";
import { Branch } from "../models/branch";
import { PaginatedResult } from "../interfaces/paginated_result";
import { ProjectOnly } from "../interfaces/project_only";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";

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
  protected static rootElementName: string = "branches";
  protected static rootElementNameSingular: string = "branch";
  protected static prefixURI: string = "projects/{!:project_id}/branches/{:id}";
  protected static elementClass: object = Branch;

  list(
    request_params: ProjectWithPagination
  ): Promise<PaginatedResult<Branch>> {
    return super.doList(request_params);
  }

  create(
    branch_params: BranchParams,
    request_params: ProjectOnly
  ): Promise<Branch> {
    return this.createPromise(
      "POST",
      request_params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      branch_params
    );
  }

  get(
    branch_id: string | number,
    request_params: ProjectOnly
  ): Promise<Branch> {
    return super.doGet(branch_id, request_params);
  }

  update(
    branch_id: string | number,
    branch_params: BranchParams,
    request_params: ProjectOnly
  ): Promise<Branch> {
    const params = {
      ...request_params,
      ...{ id: branch_id },
    };
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      branch_params
    );
  }

  delete(
    branch_id: string | number,
    request_params: ProjectOnly
  ): Promise<BranchDeleted> {
    return super.doDelete(branch_id, request_params);
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
