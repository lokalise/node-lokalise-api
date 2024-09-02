import { OtaBundleArchive } from "../models/ota/ota_bundle_archive.js";
import type {
	OtaProjectFramework,
	OtaRequestBundleParams,
} from "../types/ota.js";
import { OtaCollection } from "./ota_collection.js";

export class OtaBundles extends OtaCollection {
	protected static rootElementNameSingular = "data";
	protected static prefixURI =
		"lokalise/projects/{!:lokaliseProjectId}/frameworks/{!:framework}";
	protected static elementClass = OtaBundleArchive;

	get(
		bundle_params: OtaRequestBundleParams,
		request_params: OtaProjectFramework,
	): Promise<OtaBundleArchive> {
		const params = {
			...request_params,
			...bundle_params,
		};

		return this.createPromise(
			"GET",
			params,
			this.populateObjectFromJsonRoot,
			this.handleReject,
			null,
		);
	}
}
