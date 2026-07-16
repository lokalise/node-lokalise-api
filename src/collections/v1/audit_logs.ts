import type { CursorPaginatedResultV1 } from "../../interfaces/v1/cursor_paginated_result.js";
import { AuditEventV1 } from "../../models/v1/audit_event.js";
import type { AuditLogParams } from "../../types/v1/audit_logs.js";
import { BaseCollection } from "../base_collection.js";

export class AuditLogs extends BaseCollection<AuditEventV1> {
	protected static override prefixURI = "audit-logs";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => AuditEventV1 {
		return AuditEventV1;
	}

	list(
		request_params: AuditLogParams = {},
	): Promise<CursorPaginatedResultV1<AuditEventV1>> {
		return this.doListCursorV1(request_params);
	}
}
