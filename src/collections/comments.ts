import { BaseCollection } from "./base_collection.js";
import { Comment } from "../models/comment.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { PaginatedResult } from "../models/paginated_result.js";
import { Keyable } from "../interfaces/keyable.js";

export class Comments extends BaseCollection {
  protected static rootElementName = "comments";
  protected static rootElementNameSingular = "comment";
  protected static prefixURI =
    "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
  protected static elementClass = Comment;

  create(
    raw_body: Keyable | Keyable[],
    params: StandartParams
  ): Promise<Comment[]> {
    const body: Keyable = { comments: this.objToArray(raw_body) };
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
