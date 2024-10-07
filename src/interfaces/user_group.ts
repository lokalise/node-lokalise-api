export interface UserGroup {
	group_id: number;
	name: string;
	permissions: {
		is_admin: boolean; // deprecated
		is_reviewer: boolean; // deprecated
		admin_rights: string[];
		languages: Array<{
			lang_id: number;
			lang_iso: string;
			lang_name: string;
			is_writable: boolean;
		}>;
	};
	created_at: string;
	created_at_timestamp: number;
	team_id: number;
	projects: string[] | number[];
	members: number[] | string[];
	role_id: number | null;
}
