import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { QueuedProcess } from "../models/queued_process.js";
import type {
	ProjectOnly,
	ProjectWithPagination,
} from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";

export class QueuedProcesses extends BaseCollection<QueuedProcess> {
	protected static override prefixURI =
		"projects/{!:project_id}/processes/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => QueuedProcess {
		return QueuedProcess;
	}

	protected override get rootElementName(): string {
		return "processes";
	}

	protected override get rootElementNameSingular(): string | null {
		return "process";
	}

	list(
		request_params: ProjectWithPagination,
	): Promise<PaginatedResult<QueuedProcess>> {
		return this.doList(request_params) as Promise<
			PaginatedResult<QueuedProcess>
		>;
	}

	get(
		process_id: string | number,
		request_params: ProjectOnly,
	): Promise<QueuedProcess> {
		return this.doGet(process_id, request_params);
	}
}
