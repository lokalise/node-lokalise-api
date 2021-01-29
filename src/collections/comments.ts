import { BaseCollection } from "./base_collection";
import { Comment } from "../models/comment";
import { StandartParams } from "../interfaces/standart_params";
import { PaginatedResult } from "../models/paginated_result";

export class Comments extends BaseCollection {
  protected static rootElementName: string = "comments";
  protected static rootElementNameSingular: string = "comment";
  protected static prefixURI: string =
    "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
  protected static elementClass: Object = Comment;

  create(
    raw_body: Object | Array<Object>,
    params: StandartParams
  ): Promise<Comment[]> {
    const body: Object = { comments: this.objToArray(raw_body) };
    return this.createPromise(
      "POST",
      params,
      this.populateArrayFromJson,
      this.handleReject,
      body
    );
  }

  list_project_comments(params: StandartParams): Promise<PaginatedResult> {
    return this.createPromise(
      "GET",
      { project_id: params["project_id"] },
      this.populateArrayFromJson,
      this.handleReject,
      null,
      "projects/{!:project_id}/comments"
    );
  }
}
