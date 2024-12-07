import type { Keyable } from "../interfaces/keyable.js";
import { OtaStatistics } from "../models/ota/ota_statistics.js";
import type { OtaTeamProject, OtaUsageParams } from "../types/ota.js";
import { OtaCollection } from "./ota_collection.js";

export class OtaUsageStatistics extends OtaCollection<OtaStatistics> {
	protected static prefixURI =
		"teams/{!:teamId}/projects/{!:lokaliseProjectId}/stats";
	protected static elementClass = OtaStatistics;

	protected get elementClass(): new (
		json: Keyable,
	) => OtaStatistics {
		return OtaStatistics;
	}

	get(
		bundle_params: OtaUsageParams,
		request_params: OtaTeamProject,
	): Promise<OtaStatistics> {
		const params = {
			...request_params,
			...bundle_params,
		};

		return this.createPromise("GET", params, this.populateObjectFromJson, null);
	}
}
