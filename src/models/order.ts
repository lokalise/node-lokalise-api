import { Order as OrderInterface } from "../interfaces/order.js";
import { BaseModel } from "./base_model.js";
import { Keyable } from "../interfaces/keyable.js";

export class Order extends BaseModel implements OrderInterface {
  declare order_id: string;
  declare project_id: string;
  declare branch: string;
  declare card_id: number | string;
  declare status: string;
  declare created_at: string;
  declare created_at_timestamp: number;
  declare created_by: number;
  declare created_by_email: string;
  declare source_language_iso: string;
  declare target_language_isos: string[];
  declare keys: number[] | string[];
  declare source_words: Keyable;
  declare provider_slug: string;
  declare translation_style: string;
  declare translation_tier: number;
  declare translation_tier_name: string;
  declare briefing: string;
  declare total: number;
  declare payment_method: string | null;
  declare is_saved_to_translation_memory: boolean;
  declare dry_run: boolean;
}
