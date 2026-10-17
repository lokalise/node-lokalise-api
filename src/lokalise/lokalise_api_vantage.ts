import { ContentUnitsVantage } from "../collections/vantage/content_units.js";
import { ProjectItemsVantage } from "../collections/vantage/project_items.js";
import { ProjectLanguagesVantage } from "../collections/vantage/project_languages.js";
import { ProjectsVantage } from "../collections/vantage/projects.js";
import { SegmentsVantage } from "../collections/vantage/segments.js";
import { TasksVantage } from "../collections/vantage/tasks.js";
import type { ClientParams } from "../interfaces/client_params.js";
import { BaseClient } from "./base_client.js";

export class LokaliseApiVantage extends BaseClient {
	constructor(params: ClientParams) {
		super(params);

		this.clientData.version = params.version ?? "vantage/v1";
		this.clientData.authHeader = params.header ?? this.clientData.authHeader;
	}

	contentUnits(): ContentUnitsVantage {
		return new ContentUnitsVantage(this.clientData);
	}

	projects(): ProjectsVantage {
		return new ProjectsVantage(this.clientData);
	}

	projectItems(): ProjectItemsVantage {
		return new ProjectItemsVantage(this.clientData);
	}

	projectLanguages(): ProjectLanguagesVantage {
		return new ProjectLanguagesVantage(this.clientData);
	}

	segments(): SegmentsVantage {
		return new SegmentsVantage(this.clientData);
	}

	tasks(): TasksVantage {
		return new TasksVantage(this.clientData);
	}
}
