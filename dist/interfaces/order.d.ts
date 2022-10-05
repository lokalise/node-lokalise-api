import { Keyable } from "./keyable.js";
export interface Order {
    order_id: string;
    project_id: string;
    branch: string;
    payment_method: string | null;
    card_id: number | string;
    status: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
    source_language_iso: string;
    target_language_isos: string[];
    keys: number[] | string[];
    source_words: Keyable;
    provider_slug: string;
    translation_style: string;
    translation_tier: number;
    translation_tier_name: string;
    briefing: string;
    is_saved_to_translation_memory: boolean;
    total: number;
}
