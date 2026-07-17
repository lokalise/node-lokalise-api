import { AuditLogs } from "../collections/index.js";
import type { ClientParams } from "../interfaces/client_params.js";
import { BaseClient } from "./base_client.js";

/**
 * A main entry point for interacting with Lokalise API v1.
 * Provides access to resource collections available through API version v1.
 */
export class LokaliseApiV1 extends BaseClient {
	/**
	 * Creates a new instance of the LokaliseApiV1 client.
	 * @param params - Configuration parameters including `apiKey` and optional `version`, `host`, etc.
	 */
	constructor(params: ClientParams) {
		super(params);

		// Default to "v1" if not explicitly provided
		this.clientData.version = params.version ?? "v1";
		this.clientData.authHeader = params.header ?? this.clientData.authHeader;
	}

	/**
	 * Access Audit Logs endpoints.
	 */
	auditLogs(): AuditLogs {
		return new AuditLogs(this.clientData);
	}
}
