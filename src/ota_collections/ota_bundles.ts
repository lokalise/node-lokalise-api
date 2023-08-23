import { OtaCollection } from "./ota_collection.js";
import { OtaBundleArchive } from "../models/ota_bundle_archive.js";
import { OtaFramework } from "../interfaces/ota_framework.js";

type RequestBundleParams = {
  appVersion: string;
  transVersion: number;
  prerelease?: boolean;
};

interface OtaProjectFramework extends OtaFramework {
  lokaliseProjectId: string;
}

export class OtaBundles extends OtaCollection {
  protected static rootElementNameSingular = "data";
  protected static prefixURI =
    "lokalise/projects/{!:lokaliseProjectId}/frameworks/{!:framework}";
  protected static elementClass = OtaBundleArchive;

  get(
    bundle_params: RequestBundleParams,
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
