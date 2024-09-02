import type {
	ProjectOnly,
	ProjectWithPagination,
} from "./common_get_params.js";

export type CommentData = {
	comment?: string;
};

export type CommentDeleted = {
	project_id: string;
	comment_deleted: boolean;
	branch?: string;
};

export type ProjectAndKey = ProjectOnly & {
	key_id: number | string;
};

export type KeyProjectPagination = ProjectWithPagination & {
	key_id: number | string;
};
