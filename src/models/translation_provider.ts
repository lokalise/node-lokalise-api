import { BaseModel } from "./base_model";
import { TranslationProvider as TranslationProviderInterface } from "../interfaces/translation_provider";

export class TranslationProvider
  extends BaseModel
  implements TranslationProviderInterface {
  public provider_id: number;
  public name: string;
  public slug: string;
  public price_pair_min: number;
  public website_url: string;
  public description: string;
  public tiers: object;
  public pairs: object;
}
