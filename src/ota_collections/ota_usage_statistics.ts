import { OtaCollection } from "./ota_collection.js";
import { OtaStatistics } from "../models/ota_statistics.js";
import { OtaTeamProject } from "../interfaces/ota_team_project.js";

type OtaUsageParams = {
  dateFrom: string;
  dateTo: string;
  framework?: string;
};

export class OtaUsageStatistics extends OtaCollection {
  protected static prefixURI =
    "teams/{!:teamId}/projects/{!:lokaliseProjectId}/stats";
  protected static elementClass = OtaStatistics;

  get(
    bundle_params: OtaUsageParams,
    request_params: OtaTeamProject,
  ): Promise<OtaStatistics> {
    const params = {
      ...request_params,
      ...bundle_params,
    };

    return this.createPromise(
      "GET",
      params,
      this.populateObjectFromJson,
      this.handleReject,
      null,
    );
  }
}
