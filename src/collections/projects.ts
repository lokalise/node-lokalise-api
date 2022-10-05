import { Project } from "../models/project.js";
import { BaseCollection } from "./base_collection.js";
import { PaginationParams } from "../interfaces/pagination_params.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";

interface ProjectListParams extends PaginationParams {
  filter_team_id?: number | string;
  filter_names?: string;
  include_statistics?: string | number;
  include_settings?: string | number;
}

type ProjectParams = {
  name: string;
  team_id?: number | string;
  description?: string;
  languages?: Array<{
    lang_iso: string;
    custom_iso?: string;
  }>;
  base_lang_iso?: string;
  project_type?: "localization_files" | "paged_documents";
  is_segmentation_enabled?: boolean;
};

type ProjectUpdateParams = {
  name: string;
  description?: string;
};

type ProjectDeleted = {
  project_id: string;
  project_deleted: boolean;
};

type ProjectEmptied = {
  project_id: string;
  keys_deleted: boolean;
};

export class Projects extends BaseCollection {
  protected static rootElementName = "projects";
  protected static prefixURI = "projects/{:id}";
  protected static elementClass = Project;

  list(
    request_params: ProjectListParams = {}
  ): Promise<PaginatedResult<Project>> {
    return this.doList(request_params);
  }

  create(project_params: ProjectParams): Promise<Project> {
    return this.doCreate(project_params);
  }

  get(project_id: string | number): Promise<Project> {
    return this.doGet(project_id);
  }

  update(
    project_id: string | number,
    project_params: ProjectUpdateParams
  ): Promise<Project> {
    return this.doUpdate(
      project_id,
      project_params,
      {},
      this.populateObjectFromJson
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
      "projects/{!:project_id}/empty"
    );
  }
}
