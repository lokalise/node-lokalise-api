import type { Keyable } from "../interfaces/keyable.js";
import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { UserGroup } from "../models/user_group.js";
import type { TeamOnly } from "../types/common_get_params.js";
import type { TeamWithPagination } from "../types/teams.js";
import type {
	UserGroupDeleted,
	UserGroupParams,
} from "../types/user_groups.js";
import { BaseCollection } from "./base_collection.js";

export class UserGroups extends BaseCollection {
	protected static rootElementName = "user_groups";
	protected static prefixURI = "teams/{!:team_id}/groups/{:id}";
	protected static elementClass = UserGroup;

	list(
		request_params: TeamWithPagination,
	): Promise<PaginatedResult<UserGroup>> {
		return this.doList(request_params);
	}

	create(
		user_group_params: UserGroupParams,
		request_params: TeamOnly,
	): Promise<UserGroup> {
		return this.doCreate(
			user_group_params,
			request_params,
			this.populateGroupFromJsonRoot,
		);
	}

	get(
		user_group_id: string | number,
		request_params: TeamOnly,
	): Promise<UserGroup> {
		return this.doGet(user_group_id, request_params);
	}

	update(
		user_group_id: string | number,
		user_group_params: UserGroupParams,
		request_params: TeamOnly,
	): Promise<UserGroup> {
		return this.doUpdate(
			user_group_id,
			user_group_params,
			request_params,
			this.populateGroupFromJsonRoot,
		);
	}

	delete(
		user_group_id: string | number,
		request_params: TeamOnly,
	): Promise<UserGroupDeleted> {
		return this.doDelete(user_group_id, request_params);
	}

	add_members_to_group(
		team_id: string | number,
		group_id: string | number,
		user_ids: string[] | number[],
	): Promise<UserGroup> {
		const params = {
			team_id: team_id,
			group_id: group_id,
		};
		const body = { users: user_ids };
		return this.createPromise(
			"PUT",
			params,
			this.populateGroupFromJsonRoot,
			this.handleReject,
			body,
			"teams/{!:team_id}/groups/{!:group_id}/members/add",
		);
	}

	remove_members_from_group(
		team_id: string | number,
		group_id: string | number,
		user_ids: string[] | number[],
	): Promise<UserGroup> {
		const params = {
			team_id: team_id,
			group_id: group_id,
		};
		const body = { users: user_ids };
		return this.createPromise(
			"PUT",
			params,
			this.populateGroupFromJsonRoot,
			this.handleReject,
			body,
			"teams/{!:team_id}/groups/{!:group_id}/members/remove",
		);
	}

	add_projects_to_group(
		team_id: string | number,
		group_id: string | number,
		project_ids: string[] | number[],
	): Promise<UserGroup> {
		const params = {
			team_id: team_id,
			group_id: group_id,
		};
		const body = { projects: project_ids };
		return this.createPromise(
			"PUT",
			params,
			this.populateGroupFromJsonRoot,
			this.handleReject,
			body,
			"teams/{!:team_id}/groups/{!:group_id}/projects/add",
		);
	}

	remove_projects_from_group(
		team_id: string | number,
		group_id: string | number,
		project_ids: string[] | number[],
	): Promise<UserGroup> {
		const params = {
			team_id: team_id,
			group_id: group_id,
		};
		const body = { projects: project_ids };
		return this.createPromise(
			"PUT",
			params,
			this.populateGroupFromJsonRoot,
			this.handleReject,
			body,
			"teams/{!:team_id}/groups/{!:group_id}/projects/remove",
		);
	}

	protected populateGroupFromJsonRoot(json: Keyable, headers: Headers): this {
		const formatted_json = json["group"];
		return <this>this.populateObjectFromJson(formatted_json, headers);
	}
}
