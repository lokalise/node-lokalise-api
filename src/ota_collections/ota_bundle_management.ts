import { OtaBundle } from "../models/ota/ota_bundle.js";
import type {
	OtaBundleUpdateData,
	OtaResourceDeleted,
	OtaTeamProject,
} from "../types/ota.js";
import { OtaCollection } from "./ota_collection.js";

export class OtaBundleManagement extends OtaCollection<OtaBundle> {
	protected static override prefixURI =
		"teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundles/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => OtaBundle {
		return OtaBundle;
	}

	protected override get rootElementName(): string {
		return "data";
	}

	protected override get rootElementNameSingular(): string | null {
		return "data";
	}

	list(request_params: OtaTeamProject): Promise<OtaBundle[]> {
		return this.doList(request_params) as Promise<OtaBundle[]>;
	}

	get(
		bundleId: string | number,
		requestParams: OtaTeamProject,
	): Promise<OtaBundle> {
		return this.doGet(bundleId, requestParams);
	}

	update(
		bundleId: string | number,
		bundleParams: OtaBundleUpdateData,
		requestParams: OtaTeamProject,
	): Promise<OtaBundle> {
		return this.doUpdate(
			bundleId,
			bundleParams,
			requestParams,
			this.populateObjectFromJsonRoot,
			"PATCH",
		);
	}

	delete(
		bundleId: string | number,
		requestParams: OtaTeamProject,
	): Promise<OtaResourceDeleted> {
		return this.doDelete(bundleId, requestParams);
	}
}
