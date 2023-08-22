import { OtaCollection } from "./ota_collection.js";
import { SdkToken } from "../models/sdk_token.js";
import { OtaTeamProject } from "../interfaces/ota_team_project.js";

type SdkTokenDeleted = {
  id: number;
  deleted: boolean;
};

export class SdkTokens extends OtaCollection {
  protected static rootElementName = "data";
  protected static rootElementNameSingular = "data";
  protected static prefixURI =
    "teams/{!:teamId}/projects/{!:lokaliseProjectId}/tokens/{:id}";
  protected static elementClass = SdkToken;

  list(request_params: OtaTeamProject): Promise<SdkToken[]> {
    return this.doList(request_params);
  }

  create(request_params: OtaTeamProject): Promise<SdkToken> {
    return this.doCreate(null, request_params, this.populateObjectFromJsonRoot);
  }

  delete(
    tokenId: string | number,
    request_params: OtaTeamProject,
  ): Promise<SdkTokenDeleted> {
    return this.doDelete(tokenId, request_params);
  }
}
