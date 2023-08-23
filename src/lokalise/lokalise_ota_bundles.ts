import { BaseClient, ClientParams } from "./base_client.js";
import { OtaBundles } from "../ota_collections/ota_bundles.js";

export class LokaliseOtaBundles extends BaseClient {
  constructor(params: ClientParams) {
    super(params);

    this.clientData.authHeader = "x-ota-api-token";
    this.clientData.host =
      this.clientData.host ?? "https://ota.lokalise.com/v3";
  }

  otaBundles(): OtaBundles {
    return new OtaBundles(this.clientData);
  }
}
