import { OtaFreezePeriod } from "../models/ota/ota_freeze_period.js";
import type {
	OtaFreezePeriodParams,
	OtaResourceDeleted,
	OtaTeamProject,
	OtaTeamProjectFramework,
} from "../types/ota.js";
import { OtaCollection } from "./ota_collection.js";

export class OtaFreezePeriods extends OtaCollection {
	protected static rootElementName = "data";
	protected static rootElementNameSingular = "data";
	protected static prefixURI =
		"teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundle-freezes/{:id}";
	protected static elementClass = OtaFreezePeriod;

	list(requestParams: OtaTeamProjectFramework): Promise<OtaFreezePeriod[]> {
		return this.doList(requestParams);
	}

	create(
		freezeParams: OtaFreezePeriodParams,
		requestParams: OtaTeamProject,
	): Promise<OtaFreezePeriod> {
		return this.doCreate(
			freezeParams,
			requestParams,
			this.populateObjectFromJsonRoot,
		);
	}

	update(
		freezeId: string | number,
		freezeParams: OtaFreezePeriodParams,
		requestParams: OtaTeamProject,
	): Promise<OtaFreezePeriod> {
		return this.doUpdate(freezeId, freezeParams, requestParams);
	}

	delete(
		freezeId: string | number,
		requestParams: OtaTeamProject,
	): Promise<OtaResourceDeleted> {
		return this.doDelete(freezeId, requestParams);
	}
}
