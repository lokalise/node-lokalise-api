import { Branch } from "../models/branch.js";
import type { OtaTeamProjectFramework } from "../types/ota.js";
import { OtaCollection } from "./ota_collection.js";

export class OtaBundlePublishing extends OtaCollection<void> {
	protected static override prefixURI =
		"teams/{!:teamId}/projects/{!:lokaliseProjectId}/frameworks/{!:framework}/{!:action}";

	// This is just a dummy implementation to keep linter happy
	// It's not used in this class
	/* v8 ignore next 5 */
	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => Branch {
		return Branch;
	}

	publish(
		bundleId: number | string,
		request_params: OtaTeamProjectFramework,
	): Promise<null> {
		const params = {
			...request_params,
			...{ action: "publish" },
		};
		return this.createVoidPromise("POST", params, {
			bundleId,
		});
	}

	stage(
		bundleId: number | string,
		request_params: OtaTeamProjectFramework,
	): Promise<null> {
		const params = {
			...request_params,
			...{ action: "stage" },
		};
		return this.createVoidPromise("POST", params, {
			bundleId,
		});
	}
}
