import { OtaCollection } from "./ota_collection.js";
import { OtaSdkToken } from "../models/ota_sdk_token.js";
import { OtaTeamProject } from "../interfaces/ota_team_project.js";
import { OtaResourceDeleted } from "../types/ota_resource_deleted.js";

export class OtaSdkTokens extends OtaCollection {
  protected static rootElementName = "data";
  protected static rootElementNameSingular = "data";
  protected static prefixURI =
    "teams/{!:teamId}/projects/{!:lokaliseProjectId}/tokens/{:id}";
  protected static elementClass = OtaSdkToken;

  list(request_params: OtaTeamProject): Promise<OtaSdkToken[]> {
    return this.doList(request_params);
  }

  create(request_params: OtaTeamProject): Promise<OtaSdkToken> {
    return this.doCreate(null, request_params, this.populateObjectFromJsonRoot);
  }

  delete(
    tokenId: string | number,
    request_params: OtaTeamProject,
  ): Promise<OtaResourceDeleted> {
    return this.doDelete(tokenId, request_params);
  }
}
