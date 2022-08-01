import { BaseCollection } from "./base_collection";
import { Contributor } from "../models/contributor";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";
import { PaginatedResult } from "../interfaces/paginated_result";
import { ProjectOnly } from "../interfaces/project_only";

type ContributorLanguages = {
  lang_iso: string;
  is_writable?: boolean;
};

type ContributorRights =
  | "upload"
  | "activity"
  | "download"
  | "settings"
  | "create_branches"
  | "statistics"
  | "keys"
  | "screenshots"
  | "glossary"
  | "contributors"
  | "languages"
  | "tasks";

type ContributorCreateData = {
  email: string;
  fullname?: string;
  is_admin?: boolean;
  is_reviewer?: boolean;
  languages: ContributorLanguages[];
  admin_rights?: ContributorRights[];
};

type ContributorUpdateData = {
  is_admin?: boolean;
  is_reviewer?: boolean;
  languages?: ContributorLanguages[];
  admin_rights?: ContributorRights[];
};

type ContributorDeleted = {
  project_id: string;
  contributor_deleted: boolean;
};

export class Contributors extends BaseCollection {
  protected static rootElementName = "contributors";
  protected static rootElementNameSingular = "contributor";
  protected static prefixURI = "projects/{!:project_id}/contributors/{:id}";
  protected static elementClass = Contributor;

  list(
    request_params: ProjectWithPagination
  ): Promise<PaginatedResult<Contributor>> {
    return this.doList(request_params);
  }

  create(
    contributor_params: ContributorCreateData | ContributorCreateData[],
    request_params: ProjectOnly
  ): Promise<Contributor[]> {
    const body = { contributors: this.objToArray(contributor_params) };
    return this.doCreate(body, request_params, this.populateArrayFromJson);
  }

  get(
    contributor_id: string | number,
    request_params: ProjectOnly
  ): Promise<Contributor> {
    return this.doGet(contributor_id, request_params);
  }

  update(
    contributor_id: string | number,
    contributor_params: ContributorUpdateData,
    request_params: ProjectOnly
  ): Promise<Contributor> {
    return this.doUpdate(contributor_id, contributor_params, request_params);
  }

  delete(
    contributor_id: string | number,
    request_params: ProjectOnly
  ): Promise<ContributorDeleted> {
    return this.doDelete(contributor_id, request_params);
  }
}
