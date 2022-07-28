import { BaseCollection } from "./base_collection";
import { Comment } from "../models/comment";
import { StandartParams } from "../interfaces/standart_params";
import { PaginatedResult } from "../interfaces/paginated_result";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";

export class Comments extends BaseCollection {
  protected static rootElementName: string = "comments";
  protected static rootElementNameSingular: string = "comment";
  protected static prefixURI: string =
    "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
  protected static elementClass: object = Comment;

  create(
    raw_body: object | object[],
    params: StandartParams
  ): Promise<Comment[]> {
    const body: object = { comments: this.objToArray(raw_body) };
    return this.createPromise(
      "POST",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      body
    );
  }

  list_project_comments(
    params: ProjectWithPagination
  ): Promise<PaginatedResult<Comment>> {
    return this.createPromise(
      "GET",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      null,
      "projects/{!:project_id}/comments"
    );
  }
}
