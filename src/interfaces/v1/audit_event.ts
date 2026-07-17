export interface AuditEventV1 {
	readonly class_uid: number;
	readonly class_name?: string;

	readonly category_uid: number;
	readonly category_name?: string;

	readonly activity_id: number;
	readonly activity_name?: string;

	readonly type_uid: number;
	readonly type_name?: string;

	readonly severity_id: number;
	readonly severity?: string;

	readonly status_id?: number;
	readonly status?: string;

	/**
	 * Unix timestamp in seconds.
	 */
	readonly time: number;

	readonly metadata: {
		readonly uid: string;
		readonly version: string;
		readonly log_provider?: string;
		readonly event_code?: string;

		readonly product?: {
			readonly vendor_name?: string;
			readonly name?: string;
			readonly version?: string | number;

			readonly [key: string]: unknown;
		};

		readonly [key: string]: unknown;
	};

	readonly actor?: {
		readonly user?: {
			readonly uid?: string;
			readonly type_id?: number;

			readonly [key: string]: unknown;
		};

		readonly session?: {
			readonly is_remote?: boolean;

			readonly [key: string]: unknown;
		};

		readonly [key: string]: unknown;
	};

	readonly src_endpoint?: {
		readonly ip?: string;

		readonly [key: string]: unknown;
	};

	readonly http_request?: {
		readonly user_agent?: string;

		readonly url?: {
			readonly url_string?: string;

			readonly [key: string]: unknown;
		};

		readonly [key: string]: unknown;
	};

	readonly enrichments?: Array<{
		readonly name?: string;
		readonly value?: string;
		readonly data?: Record<string, unknown>;

		readonly [key: string]: unknown;
	}>;

	readonly unmapped?: Record<string, unknown>;

	/**
	 * OCSF events may contain additional fields.
	 */
	readonly [key: string]: unknown;
}
