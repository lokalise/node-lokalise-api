import { LocaliseApiMethods } from "./api_methods";

export class LokaliseApi extends LocaliseApiMethods {
  public static apiKey: string | null = null;

  public apiKey: string;

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
    return this;
  }
}
