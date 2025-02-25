import type { Keyable } from "../interfaces/keyable.js";
import { OtaFreezePeriod } from "../models/ota/ota_freeze_period.js";
import type {
	OtaFreezePeriodParams,
	OtaResourceDeleted,
	OtaTeamProject,
	OtaTeamProjectFramework,
} from "../types/ota.js";
import { OtaCollection } from "./ota_collection.js";

export class OtaFreezePeriods extends OtaCollection<OtaFreezePeriod> {
	protected static override prefixURI =
		"teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundle-freezes/{:id}";

	protected get elementClass(): new (
		json: Keyable,
	) => OtaFreezePeriod {
		return OtaFreezePeriod;
	}

	protected override get rootElementName(): string {
		return "data";
	}

	protected override get rootElementNameSingular(): string | null {
		return "data";
	}

	list(requestParams: OtaTeamProjectFramework): Promise<OtaFreezePeriod[]> {
		return this.doList(requestParams) as Promise<OtaFreezePeriod[]>;
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
