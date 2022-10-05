import { Order as OrderInterface } from "../interfaces/order.js";
import { BaseModel } from "./base_model.js";
import { Keyable } from "../interfaces/keyable.js";
export declare class Order extends BaseModel implements OrderInterface {
    order_id: string;
    project_id: string;
    branch: string;
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
    total: number;
    payment_method: string | null;
    is_saved_to_translation_memory: boolean;
}
