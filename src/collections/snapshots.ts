import { BaseCollection } from "./base_collection.js";
import { Snapshot } from "../models/snapshot.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { Project } from "../models/project.js";

type CreateSnapshotParams = {
  title: string;
};

type SnapshotDeleted = {
  project_id: string;
  snapshot_deleted: boolean;
};

export class Snapshots extends BaseCollection {
  protected static rootElementName = "snapshots";
  protected static rootElementNameSingular = "snapshot";
  protected static prefixURI = "projects/{!:project_id}/snapshots/{:id}";
  protected static elementClass = Snapshot;

  list(
    request_params: ProjectWithPagination
  ): Promise<PaginatedResult<Snapshot>> {
    return this.doList(request_params);
  }

  create(
    snapshot_params: CreateSnapshotParams,
    request_params: ProjectOnly
  ): Promise<Snapshot> {
    return this.doCreate(
      snapshot_params,
      request_params,
      this.populateObjectFromJsonRoot
    );
  }

  restore(
    snapshot_id: string | number,
    request_params: ProjectOnly
  ): Promise<Project> {
    const params = {
      ...request_params,
      ...{ id: snapshot_id },
    };

    return this.createPromise(
      "POST",
      params,
      this.returnBareJSON,
      this.handleReject,
      {}
    );
  }

  delete(
    snapshot_id: string | number,
    request_params: ProjectOnly
  ): Promise<SnapshotDeleted> {
    return this.doDelete(snapshot_id, request_params);
  }
}
