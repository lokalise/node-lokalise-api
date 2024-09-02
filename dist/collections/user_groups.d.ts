import { Keyable } from "../interfaces/keyable.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { UserGroup } from "../models/user_group.js";
import type { TeamOnly } from "../types/common_get_params.js";
import type { TeamWithPagination } from "../types/teams.js";
import type {
	UserGroupDeleted,
	UserGroupParams,
} from "../types/user_groups.js";
import { BaseCollection } from "./base_collection.js";
export declare class UserGroups extends BaseCollection {
	protected static rootElementName: string;
	protected static prefixURI: string;
	protected static elementClass: typeof UserGroup;
	list(request_params: TeamWithPagination): Promise<PaginatedResult<UserGroup>>;
	create(
		user_group_params: UserGroupParams,
		request_params: TeamOnly,
	): Promise<UserGroup>;
	get(
		user_group_id: string | number,
		request_params: TeamOnly,
	): Promise<UserGroup>;
	update(
		user_group_id: string | number,
		user_group_params: UserGroupParams,
		request_params: TeamOnly,
	): Promise<UserGroup>;
	delete(
		user_group_id: string | number,
		request_params: TeamOnly,
	): Promise<UserGroupDeleted>;
	add_members_to_group(
		team_id: string | number,
		group_id: string | number,
		user_ids: string[] | number[],
	): Promise<UserGroup>;
	remove_members_from_group(
		team_id: string | number,
		group_id: string | number,
		user_ids: string[] | number[],
	): Promise<UserGroup>;
	add_projects_to_group(
		team_id: string | number,
		group_id: string | number,
		project_ids: string[] | number[],
	): Promise<UserGroup>;
	remove_projects_from_group(
		team_id: string | number,
		group_id: string | number,
		project_ids: string[] | number[],
	): Promise<UserGroup>;
	protected populateGroupFromJsonRoot(json: Keyable, headers: Headers): this;
}
