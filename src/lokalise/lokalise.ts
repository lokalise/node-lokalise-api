import { LocaliseApiMethods } from './api_methods';
// 
export class LokaliseApi extends LocaliseApiMethods {
  public static apiKey: string = null;
  private static _instance: LokaliseApi;

  public apiKey: string;

  constructor(apiKey:string) {
    super();
    LokaliseApi.apiKey = apiKey;
    if (LokaliseApi.apiKey == null || LokaliseApi.apiKey.length == 0) {
        throw new Error("Error: Instantiation failed: Please pass api key");
    }
    return this;
  }
}
