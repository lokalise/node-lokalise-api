import type { ContributorRights } from "./contributor_rights.js";
import type { ContributorRoles } from "./contributor_roles.js";

type GroupLanguages = {
	reference: string[];
	contributable: string[];
};

export type UserGroupParams = {
	name: string;
	is_reviewer: boolean;
	is_admin: boolean;
	role_id?: ContributorRoles;
	admin_rights?: ContributorRights[];
	languages?: GroupLanguages;
};

export type UserGroupDeleted = {
	team_id: string;
	group_deleted: boolean;
};
