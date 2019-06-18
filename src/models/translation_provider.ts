import { BaseModel } from './base_model';
import { TranslationProvider as TranslationProviderInterface } from "../interfaces";

export class TranslationProvider extends BaseModel implements TranslationProviderInterface {
  public provider_id: number;
  public name: string;
  public slug: string;
  public price_pair_min: number;
  public website_url: string;
  public description: string;
  public tiers: object;
  public pairs: object;
}