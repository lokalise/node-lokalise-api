import { LocaliseApiMethods } from "./api_methods";

export class LokaliseApi extends LocaliseApiMethods {
  static apiKey: string | null = null;
  static enableCompression: boolean = false;

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
    return this;
  }
}
