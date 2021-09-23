import { LokaliseApiMethods } from "./api_methods";

export class LokaliseApi extends LokaliseApiMethods {
  static apiKey: string | null = null;
  static enableCompression: boolean = false;
  static tokenHeader: string = "x-api-token";

  /**
   * Instantiate LokaliseApi to have access to methods
   * @param params  object, mandatory
   * @returns       LokaliseApi object to work with.
   */
  constructor(params: Object) {
    super();
    LokaliseApi.apiKey = Object(params)["apiKey"];
    if (LokaliseApi.apiKey == null || LokaliseApi.apiKey.length == 0) {
      throw new Error("Error: Instantiation failed: Please pass an API key");
    }
    const compression = Object(params)["enableCompression"];
    if (compression == null) {
      LokaliseApi.enableCompression = false;
    } else {
      LokaliseApi.enableCompression = compression;
    }
    if (Object(params)["fromOAuth"]) {
      LokaliseApi.tokenHeader = "Authorization";
      LokaliseApi.apiKey = "Bearer " + LokaliseApi.apiKey;
    }
    return this;
  }
}
