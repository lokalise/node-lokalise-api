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

export class Projects extends BaseCollection {
	protected static rootElementName = "projects";
	protected static prefixURI = "projects/{:id}";
	protected static elementClass = Project;

	list(
		request_params: ProjectListParams = {},
	): Promise<PaginatedResult<Project>> {
		return this.doList(request_params);
	}

	create(project_params: CreateProjectParams): Promise<Project> {
		return this.doCreate(project_params);
	}

	get(project_id: string | number): Promise<Project> {
		return this.doGet(project_id);
	}

	update(
		project_id: string | number,
		project_params: UpdateProjectParams,
	): Promise<Project> {
		return this.doUpdate(
			project_id,
			project_params,
			{},
			this.populateObjectFromJson,
		);
	}

	delete(project_id: string | number): Promise<ProjectDeleted> {
		return this.doDelete(project_id);
	}

	empty(project_id: any): Promise<ProjectEmptied> {
		return this.createPromise(
			"PUT",
			{ project_id: project_id },
			this.returnBareJSON,
			this.handleReject,
			null,
			"projects/{!:project_id}/empty",
		);
	}
}
