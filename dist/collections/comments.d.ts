import { BaseCollection } from "./base_collection.js";
import { Comment } from "../models/comment.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
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
export declare class Comments extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Comment;
    list(request_params: ParamsWithPagination): Promise<PaginatedResult<Comment>>;
    create(comment_params: CommentData | CommentData[], request_params: ProjectAndKey): Promise<Comment[]>;
    get(comment_id: string | number, request_params: ProjectAndKey): Promise<Comment>;
    delete(comment_id: string | number, request_params: ProjectAndKey): Promise<CommentDeleted>;
    list_project_comments(params: ProjectWithPagination): Promise<PaginatedResult<Comment>>;
}
export {};
