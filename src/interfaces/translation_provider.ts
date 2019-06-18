export interface TranslationProvider {
  provider_id: number;
  name: string;
  slug: string;
  price_pair_min: number;
  website_url: string;
  description: string;
  tiers: object;
  pairs: object;
}