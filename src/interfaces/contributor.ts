export interface Contributor {
	user_id: number;
	email: string;
	fullname: string;
	created_at: string;
	created_at_timestamp: number;
	is_admin: boolean; //deprecated
	is_reviewer: boolean; //deprecated
	languages: Array<{
		lang_id: number;
		lang_iso: string;
		lang_name: string;
		is_writable: boolean;
	}>;
	admin_rights: string[];
	role_id: number;
	uuid?: string;
}
