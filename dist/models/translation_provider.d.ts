import { BaseModel } from "./base_model.js";
import { TranslationProvider as TranslationProviderInterface } from "../interfaces/translation_provider.js";
export declare class TranslationProvider extends BaseModel implements TranslationProviderInterface {
    provider_id: number;
    name: string;
    slug: string;
    price_pair_min: number;
    website_url: string;
    description: string;
    tiers: object;
    pairs: object;
}
