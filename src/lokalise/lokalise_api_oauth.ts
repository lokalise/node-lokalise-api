import { LokaliseApi } from "./lokalise_api";

export class LokaliseApiOAuth extends LokaliseApi {
  constructor(params: Object) {
    super(params);

    const tokenType = Object(params)["tokenType"];
    if (tokenType) {
      this.clientData.tokenType = tokenType;
    } else {
      this.clientData.tokenType = "Bearer";
    }

    this.clientData.authHeader = "Authorization";
  }
}
