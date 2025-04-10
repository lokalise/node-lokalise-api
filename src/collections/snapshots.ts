import type { PaginatedResult } from "../interfaces/paginated_result.js";
import type { Project } from "../models/project.js";
import { Snapshot } from "../models/snapshot.js";
import type {
	ProjectOnly,
	ProjectWithPagination,
} from "../types/common_get_params.js";
import type {
	CreateSnapshotParams,
	SnapshotDeleted,
} from "../types/snapshots.js";
import { BaseCollection } from "./base_collection.js";

export class Snapshots extends BaseCollection<Snapshot> {
	protected static override prefixURI =
		"projects/{!:project_id}/snapshots/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => Snapshot {
		return Snapshot;
	}

	protected override get rootElementName(): string {
		return "snapshots";
	}

	protected override get rootElementNameSingular(): string | null {
		return "snapshot";
	}

	list(
		request_params: ProjectWithPagination,
	): Promise<PaginatedResult<Snapshot>> {
		return this.doList(request_params) as Promise<PaginatedResult<Snapshot>>;
	}

	create(
		snapshot_params: CreateSnapshotParams,
		request_params: ProjectOnly,
	): Promise<Snapshot> {
		return this.doCreate(
			snapshot_params,
			request_params,
			this.populateObjectFromJsonRoot,
		);
	}

	restore(
		snapshot_id: string | number,
		request_params: ProjectOnly,
	): Promise<Project> {
		const params = {
			...request_params,
			...{ id: snapshot_id },
		};

		return this.createPromise("POST", params, this.returnBareJSON<Project>, {});
	}

	delete(
		snapshot_id: string | number,
		request_params: ProjectOnly,
	): Promise<SnapshotDeleted> {
		return this.doDelete(snapshot_id, request_params);
	}
}
