import { type ClientParams, LokaliseApi } from "./lokalise_api.js";

export class LokaliseApiOAuth extends LokaliseApi {
	constructor(params: ClientParams) {
		super(params);

		this.clientData.tokenType = params.tokenType ?? "Bearer";
		this.clientData.authHeader = "Authorization";
	}
}
