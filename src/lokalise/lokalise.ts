import { LocaliseApiMethods } from './api_methods';

export class LokaliseApi extends LocaliseApiMethods {
  public static apiKey: string = '44fd964aa8ac7196762d61a4949326fea38a5f60';
  private static _instance: LokaliseApi;

  public apiKey: string;

  constructor(apiKey:string) {
    super();
    LokaliseApi.apiKey = apiKey;
    if (LokaliseApi.apiKey.length == 0) {
        throw new Error("Error: Instantiation failed: Please pass api key");
    }
    return this;
  }
}
