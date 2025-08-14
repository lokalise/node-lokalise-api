import type { PaginationParams } from "./common_get_params.js";

export type CreateProjectParams = {
	name: string;
	team_id?: number | string;
	description?: string;
	languages?: Array<{
		lang_iso: string;
		custom_iso?: string;
	}>;
	base_lang_iso?: string;
	project_type?:
		| "localization_files"
		| "paged_documents"
		| "marketing"
		| "marketing_integrations";
	is_segmentation_enabled?: boolean;
};

export type UpdateProjectParams = {
	name: string;
	description?: string;
};

export type ProjectDeleted = {
	project_id: string;
	project_deleted: boolean;
};

export type ProjectEmptied = {
	project_id: string;
	keys_deleted: boolean;
};

export type ProjectListParams = PaginationParams & {
	filter_team_id?: number | string;
	filter_names?: string;
	include_statistics?: string | number;
	include_settings?: string | number;
};
