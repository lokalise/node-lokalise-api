export interface TranslationProvider {
    provider_id: number;
    name: string;
    slug: string;
    price_pair_min: number;
    website_url: string;
    description: string;
    tiers: Array<{
        tier_id: number;
        title: string;
    }>;
    pairs: Array<{
        tier_id: number;
        from_lang_iso: string;
        from_lang_name: string;
        to_lang_iso: string;
        to_lang_name: string;
        price_per_word: number;
    }>;
}
