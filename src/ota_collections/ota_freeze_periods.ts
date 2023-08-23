import { OtaCollection } from "./ota_collection.js";
import { OtaFreezePeriod } from "../models/ota_freeze_period.js";
import { OtaTeamProject } from "../interfaces/ota_team_project.js";
import { OtaTeamProjectFramework } from "../interfaces/ota_team_project_framework.js";
import { OtaResourceDeleted } from "../types/ota_resource_deleted.js";

type FreezePeriodParams = {
  from: string;
  to: string;
  bundleId: number | string;
};

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
    freezeParams: FreezePeriodParams,
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
    freezeParams: FreezePeriodParams,
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
