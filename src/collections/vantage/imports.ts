import { ImportVantage } from "../../models/vantage/import.js";
import type { ImportParams } from "../../types/vantage/import.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class ImportsVantage extends BaseCollectionVantage<ImportVantage> {
	protected static override prefixURI = "projects/{!:project_id}/imports";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => ImportVantage {
		return ImportVantage;
	}

	create(
		request_params: { project_id: string },
		body: ImportParams,
	): Promise<ImportVantage> {
		return this.createPromise(
			"POST",
			request_params,
			this.populateObjectFromJsonRoot,
			body,
		);
	}
}
