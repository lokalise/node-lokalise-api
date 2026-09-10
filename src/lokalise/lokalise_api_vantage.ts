import { ProjectItems } from "../collections/vantage/project_items.js";
import type { ClientParams } from "../interfaces/client_params.js";
import { BaseClient } from "./base_client.js";

export class LokaliseApiVantage extends BaseClient {
	constructor(params: ClientParams) {
		super(params);

		this.clientData.version = params.version ?? "vantage/v1";
		this.clientData.authHeader = params.header ?? this.clientData.authHeader;
	}

	projectItems(): ProjectItems {
		return new ProjectItems(this.clientData);
	}
}
