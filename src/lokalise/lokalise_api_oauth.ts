import { LokaliseApi } from "./lokalise_api";

export class LokaliseApiOAuth extends LokaliseApi {
  constructor(params: Object) {
    super(params);
    this.clientData.token = "Bearer " + this.clientData.token;
    this.clientData.authHeader = "Authorization";
  }
}
