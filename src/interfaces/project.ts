import type { ProjectSettings } from "./project_settings.js";
import type { ProjectStatistics } from "./project_statistics.js";

export interface Project {
	project_id: string;
	project_type: string;
	uuid?: string;
	name: string;
	description: string;
	created_at: string;
	created_at_timestamp: number;
	created_by: number;
	created_by_email: string;
	team_id: number;
	team_uuid: string;
	base_language_id: number;
	base_language_iso: string;
	settings: ProjectSettings;
	statistics: ProjectStatistics;
}
