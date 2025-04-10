import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Project } from "../models/project.js";
import type {
	CreateProjectParams,
	ProjectDeleted,
	ProjectEmptied,
	ProjectListParams,
	UpdateProjectParams,
} from "../types/projects.js";
import { BaseCollection } from "./base_collection.js";

export class Projects extends BaseCollection<Project> {
	protected static override prefixURI = "projects/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => Project {
		return Project;
	}

	protected override get rootElementName(): string {
		return "projects";
	}

	protected override get rootElementNameSingular(): string | null {
		return null;
	}

	list(
		request_params: ProjectListParams = {},
	): Promise<PaginatedResult<Project>> {
		return this.doList(request_params) as Promise<PaginatedResult<Project>>;
	}

	create(project_params: CreateProjectParams): Promise<Project> {
		return this.doCreate(project_params);
	}

	get(project_id: string): Promise<Project> {
		return this.doGet(project_id);
	}

	update(
		project_id: string,
		project_params: UpdateProjectParams,
	): Promise<Project> {
		return this.doUpdate(
			project_id,
			project_params,
			{},
			this.populateObjectFromJson,
		);
	}

	delete(project_id: string): Promise<ProjectDeleted> {
		return this.doDelete(project_id);
	}

	empty(project_id: string): Promise<ProjectEmptied> {
		return this.createPromise(
			"PUT",
			{ project_id: project_id },
			this.returnBareJSON<ProjectEmptied>,
			null,
			"projects/{!:project_id}/empty",
		);
	}
}
