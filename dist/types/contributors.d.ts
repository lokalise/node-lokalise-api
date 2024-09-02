import type { ContributorRights } from "./contributor_rights.js";
export type ContributorLanguages = {
	lang_iso: string;
	is_writable?: boolean;
};
export type ContributorCreateData = {
	email: string;
	fullname?: string;
	is_admin?: boolean;
	is_reviewer?: boolean;
	languages: ContributorLanguages[];
	admin_rights?: ContributorRights[];
};
export type ContributorUpdateData = {
	is_admin?: boolean;
	is_reviewer?: boolean;
	languages?: ContributorLanguages[];
	admin_rights?: ContributorRights[];
};
export type ContributorDeleted = {
	project_id: string;
	contributor_deleted: boolean;
	branch?: string;
};
