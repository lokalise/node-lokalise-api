import { Order as OrderInterface } from "../interfaces/order";
import { BaseModel } from "./base_model";
export declare class Order extends BaseModel implements OrderInterface {
    order_id: string;
    project_id: string;
    card_id: number;
    status: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
    source_language_iso: string;
    target_language_isos: string[];
    keys: number[];
    source_words: object;
    provider_slug: string;
    translation_style: string;
    translation_tier: number;
    translation_tier_name: string;
    briefing: string;
    total: number;
}
