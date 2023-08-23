import { OtaCollection } from "./ota_collection.js";
import { OtaBundle } from "../models/ota_bundle.js";
import { OtaTeamProject } from "../interfaces/ota_team_project.js";
import { OtaResourceDeleted } from "../types/ota_resource_deleted.js";

type BundleUpdateData = {
  description: string;
};

export class OtaBundleManagement extends OtaCollection {
  protected static rootElementName = "data";
  protected static rootElementNameSingular = "data";
  protected static prefixURI =
    "teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundles/{:id}";
  protected static elementClass = OtaBundle;

  list(request_params: OtaTeamProject): Promise<OtaBundle[]> {
    return this.doList(request_params);
  }

  get(
    bundleId: string | number,
    requestParams: OtaTeamProject,
  ): Promise<OtaBundle> {
    return this.doGet(bundleId, requestParams);
  }

  update(
    bundleId: string | number,
    bundleParams: BundleUpdateData,
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
