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
  declare tiers: Array<{
    tier_id: number;
    title: string;
  }>;
  declare pairs: Array<{
    tier_id: number;
    from_lang_iso: string;
    from_lang_name: string;
    to_lang_iso: string;
    to_lang_name: string;
    price_per_word: number;
  }>;
}
