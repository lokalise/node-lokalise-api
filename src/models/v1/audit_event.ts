import type { AuditEventV1 as IAuditEventV1 } from "../../interfaces/v1/audit_event.js";

type WithoutUndefined<T> = Exclude<T, undefined>;

export class AuditEventV1 implements IAuditEventV1 {
	readonly [key: string]: unknown;

	readonly class_uid!: number;
	readonly class_name?: string;

	readonly category_uid!: number;
	readonly category_name?: string;

	readonly activity_id!: number;
	readonly activity_name?: string;

	readonly type_uid!: number;
	readonly type_name?: string;

	readonly severity_id!: number;
	readonly severity?: string;

	readonly status_id?: number;
	readonly status?: string;

	readonly time!: number;

	readonly metadata!: IAuditEventV1["metadata"];

	readonly actor?: WithoutUndefined<IAuditEventV1["actor"]>;

	readonly src_endpoint?: WithoutUndefined<IAuditEventV1["src_endpoint"]>;

	readonly http_request?: WithoutUndefined<IAuditEventV1["http_request"]>;

	readonly enrichments?: WithoutUndefined<IAuditEventV1["enrichments"]>;

	readonly unmapped?: WithoutUndefined<IAuditEventV1["unmapped"]>;

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
