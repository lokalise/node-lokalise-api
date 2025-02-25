import type { Keyable } from "../interfaces/keyable.js";
import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Comment } from "../models/comment.js";
import type {
	CommentData,
	CommentDeleted,
	KeyProjectPagination,
	ProjectAndKey,
} from "../types/comments.js";
import type { ProjectWithPagination } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";

export class Comments extends BaseCollection<Comment> {
	protected static override prefixURI =
		"projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";

	protected get elementClass(): new (
		json: Keyable,
	) => Comment {
		return Comment;
	}

	protected override get rootElementName(): string {
		return "comments";
	}

	protected override get rootElementNameSingular(): string | null {
		return "comment";
	}

	list(
		request_params: KeyProjectPagination,
	): Promise<PaginatedResult<Comment>> {
		return this.doList(request_params) as Promise<PaginatedResult<Comment>>;
	}

	create(
		comment_params: CommentData | CommentData[],
		request_params: ProjectAndKey,
	): Promise<Comment[]> {
		const body = { comments: this.objToArray(comment_params) };

		return this.doCreateArray(body, request_params);
	}

	get(
		comment_id: string | number,
		request_params: ProjectAndKey,
	): Promise<Comment> {
		return this.doGet(comment_id, request_params);
	}

	delete(
		comment_id: string | number,
		request_params: ProjectAndKey,
	): Promise<CommentDeleted> {
		return this.doDelete(comment_id, request_params);
	}

	list_project_comments(
		params: ProjectWithPagination,
	): Promise<PaginatedResult<Comment>> {
		return this.createPromise(
			"GET",
			params,
			this.populateArrayFromJson,
			null,
			"projects/{!:project_id}/comments",
		) as Promise<PaginatedResult<Comment>>;
	}
}
