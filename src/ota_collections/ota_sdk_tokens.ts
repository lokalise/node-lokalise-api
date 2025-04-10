import { OtaSdkToken } from "../models/ota/ota_sdk_token.js";
import type { OtaResourceDeleted, OtaTeamProject } from "../types/ota.js";
import { OtaCollection } from "./ota_collection.js";

export class OtaSdkTokens extends OtaCollection<OtaSdkToken> {
	protected static override prefixURI =
		"teams/{!:teamId}/projects/{!:lokaliseProjectId}/tokens/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => OtaSdkToken {
		return OtaSdkToken;
	}

	protected override get rootElementName(): string {
		return "data";
	}

	protected override get rootElementNameSingular(): string | null {
		return "data";
	}

	list(request_params: OtaTeamProject): Promise<OtaSdkToken[]> {
		return this.doList(request_params) as Promise<OtaSdkToken[]>;
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
