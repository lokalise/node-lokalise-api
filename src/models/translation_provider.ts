import { BaseModel } from "./base_model";
import { TranslationProvider as TranslationProviderInterface } from "../interfaces/translation_provider";

export class TranslationProvider
  extends BaseModel
  implements TranslationProviderInterface
{
  declare provider_id: number;
  declare name: string;
  declare slug: string;
  declare price_pair_min: number;
  declare website_url: string;
  declare description: string;
  declare tiers: object;
  declare pairs: object;
}
