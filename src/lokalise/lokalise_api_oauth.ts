import { LokaliseApi } from "./lokalise_api";

export class LokaliseApiOAuth extends LokaliseApi {
  constructor(params: { [key: string]: any }) {
    super(params);

    const tokenType = params["tokenType"];
    this.clientData.tokenType = tokenType ?? "Bearer";

    this.clientData.authHeader = "Authorization";
  }
}
