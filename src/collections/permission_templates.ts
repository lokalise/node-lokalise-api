import type { PaginatedResult } from "../interfaces/index.js";
import { PermissionTemplate } from "../models/permission_template.js";
import type { TeamOnly } from "../types/index.js";
import { BaseCollection } from "./base_collection.js";

export class PermissionTemplates extends BaseCollection {
	protected static prefixURI = "teams/{!:team_id}/roles";
	protected static elementClass = PermissionTemplate;
	protected static rootElementName = "roles";

	list(request_params: TeamOnly): Promise<PaginatedResult<PermissionTemplate>> {
		return this.doList(request_params);
	}
}
