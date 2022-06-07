import { LokaliseApi, ClientParams } from "./lokalise_api";

export class LokaliseApiOAuth extends LokaliseApi {
  constructor(params: ClientParams) {
    super(params);

    const tokenType = params["tokenType"];
    this.clientData.tokenType = tokenType ?? "Bearer";

    this.clientData.authHeader = "Authorization";
  }
}
