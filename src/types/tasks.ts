import type { ProjectWithPagination } from "./common_get_params.js";

export type TaskLanguage = {
	language_iso: string;
	users?: string[] | number[];
	groups?: string[] | number[];
};

export type CreateTaskParams = {
	title: string;
	description?: string;
	due_date?: string;
	keys?: string[] | number[];
	languages?: Array<TaskLanguage>;
	source_language_iso?: string;
	auto_close_languages?: boolean;
	auto_close_task?: boolean;
	auto_close_items?: boolean;
	task_type?: string;
	parent_task_id?: string | number;
	closing_tags?: string[];
	do_lock_translations?: boolean;
	custom_translation_status_ids?: string[] | number[];
	save_ai_translation_to_tm?: boolean;
	apply_ai_tm100_matches?: boolean;
	use_tm_as_context?: boolean;
};

export type UpdateTaskParams = Omit<
	CreateTaskParams,
	| "title"
	| "keys"
	| "source_language_iso"
	| "task_type"
	| "parent_task_id"
	| "custom_translation_status_ids"
	| "save_ai_translation_to_tm"
	| "apply_ai_tm100_matches"
	| "use_tm_as_context"
> & {
	title?: string;
	close_task?: boolean;
	languages?: Array<
		TaskLanguage & {
			close_language?: boolean;
		}
	>;
};

export type TaskDeleted = {
	project_id: string;
	task_deleted: boolean;
	branch?: string;
};

export type ListTaskParams = ProjectWithPagination & {
	filter_title?: string;
	filter_statuses?: string;
};
