import type { PaginatedResult } from "../interfaces/index.js";
import { PermissionTemplate } from "../models/permission_template.js";
import type { TeamOnly } from "../types/index.js";
import { BaseCollection } from "./base_collection.js";

export class PermissionTemplates extends BaseCollection<PermissionTemplate> {
	protected static override prefixURI = "teams/{!:team_id}/roles";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => PermissionTemplate {
		return PermissionTemplate;
	}

	protected override get rootElementName(): string {
		return "roles";
	}

	list(request_params: TeamOnly): Promise<PaginatedResult<PermissionTemplate>> {
		return this.doList(request_params) as Promise<
			PaginatedResult<PermissionTemplate>
		>;
	}
}
