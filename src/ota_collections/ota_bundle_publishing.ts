import type { OtaTeamProjectFramework } from "../types/ota.js";
import { OtaCollection } from "./ota_collection.js";

export class OtaBundlePublishing extends OtaCollection {
	protected static prefixURI =
		"teams/{!:teamId}/projects/{!:lokaliseProjectId}/frameworks/{!:framework}/{!:action}";

	publish(
		bundleId: number | string,
		request_params: OtaTeamProjectFramework,
	): Promise<void> {
		const params = {
			...request_params,
			...{ action: "publish" },
		};
		return this.createPromise("POST", params, null, this.handleReject, {
			bundleId,
		});
	}

	stage(
		bundleId: number | string,
		request_params: OtaTeamProjectFramework,
	): Promise<void> {
		const params = {
			...request_params,
			...{ action: "stage" },
		};
		return this.createPromise("POST", params, null, this.handleReject, {
			bundleId,
		});
	}
}
