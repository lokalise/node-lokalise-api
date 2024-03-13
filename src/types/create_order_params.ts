export type CreateOrderParams = {
  project_id: string;
  branch?: string;
  payment_method?: "credit_card" | "team_credit";
  card_id?: number | string;
  briefing: string;
  source_language_iso: string;
  target_language_isos: string[];
  keys: string[] | number[];
  provider_slug: string;
  translation_tier: number | string;
  is_saved_to_translation_memory?: boolean;
  dry_run?: boolean;
  translation_style?: "formal" | "informal" | "business" | "friendly";
};
