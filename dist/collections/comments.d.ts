import { PaginatedResult } from "../interfaces/paginated_result.js";
import { Comment } from "../models/comment.js";
import type {
	CommentData,
	CommentDeleted,
	KeyProjectPagination,
	ProjectAndKey,
} from "../types/comments.js";
import type { ProjectWithPagination } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";
export declare class Comments extends BaseCollection {
	protected static rootElementName: string;
	protected static rootElementNameSingular: string;
	protected static prefixURI: string;
	protected static elementClass: typeof Comment;
	list(request_params: KeyProjectPagination): Promise<PaginatedResult<Comment>>;
	create(
		comment_params: CommentData | CommentData[],
		request_params: ProjectAndKey,
	): Promise<Comment[]>;
	get(
		comment_id: string | number,
		request_params: ProjectAndKey,
	): Promise<Comment>;
	delete(
		comment_id: string | number,
		request_params: ProjectAndKey,
	): Promise<CommentDeleted>;
	list_project_comments(
		params: ProjectWithPagination,
	): Promise<PaginatedResult<Comment>>;
}
