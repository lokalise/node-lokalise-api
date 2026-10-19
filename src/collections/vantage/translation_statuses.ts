import { TranslationStatusVantage } from "../../models/vantage/translation_status.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class TranslationStatusesVantage extends BaseCollectionVantage<TranslationStatusVantage> {
	protected static override prefixURI =
		"projects/{!:project_id}/translation-statuses";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => TranslationStatusVantage {
		return TranslationStatusVantage;
	}

	get(request_params: {
		project_id: string;
		import_id: string;
	}): Promise<TranslationStatusVantage> {
		return this.doGetVantage(
			request_params,
			"projects/{!:project_id}/translation-statuses/{!:import_id}",
		);
	}
}
