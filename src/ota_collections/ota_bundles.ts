import { OtaCollection } from "./ota_collection.js";
import { OtaBundleArchive } from "../models/ota_bundle_archive.js";

type RequestBundleParams = {
  appVersion: string;
  transVersion: number;
  prerelease?: boolean;
};

type OtaProjectFramework = {
  lokaliseProjectId: string;
  framework: "ios_sdk" | "android_sdk" | "flutter_sdk";
};

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
