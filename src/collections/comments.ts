import { BaseCollection } from "./base_collection";
import { Comment } from "../models/comment";
import { PaginatedResult } from "../interfaces/paginated_result";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";
import { ProjectOnly } from "../interfaces/project_only";

interface ParamsWithPagination extends ProjectWithPagination {
  key_id: number | string;
}

interface ProjectAndKey extends ProjectOnly {
  key_id: number | string;
}

type CommentData = {
  comment: string;
};

type CommentDeleted = {
  project_id: string;
  comment_deleted: boolean;
};

export class Comments extends BaseCollection {
  protected static rootElementName: string = "comments";
  protected static rootElementNameSingular: string = "comment";
  protected static prefixURI: string =
    "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
  protected static elementClass: object = Comment;

  list(
    request_params: ParamsWithPagination
  ): Promise<PaginatedResult<Comment>> {
    return super.doList(request_params);
  }

  create(
    comment_params: CommentData | CommentData[],
    request_params: ProjectAndKey
  ): Promise<Comment[]> {
    const body: object = { comments: this.objToArray(comment_params) };
    return this.createPromise(
      "POST",
      request_params,
      this.populateArrayFromJson,
      this.handleReject,
      body
    );
  }

  get(
    comment_id: string | number,
    request_params: ProjectAndKey
  ): Promise<Comment> {
    return super.doGet(comment_id, request_params);
  }

  delete(
    comment_id: string | number,
    request_params: ProjectAndKey
  ): Promise<CommentDeleted> {
    return super.doDelete(comment_id, request_params);
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
