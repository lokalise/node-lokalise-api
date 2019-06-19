import { LocaliseApiMethods } from './api_methods';

export class LokaliseApi extends LocaliseApiMethods {
  public static apiKey: string = null;
  private static _instance: LokaliseApi;

  public apiKey: string;

  /**
   * Instantiate LokaliseApi to have access to methods
   * @param params  object, mandaratory
   * @returns       LokaliseApi object to work with.
   */
  constructor(params: Object = {}) {
    super();
    LokaliseApi.apiKey = params['apiKey'];
    if (LokaliseApi.apiKey == null || LokaliseApi.apiKey.length == 0) {
      throw new Error("Error: Instantiation failed: Please pass an API key");
    }
    return this;
  }
}
