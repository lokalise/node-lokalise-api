import { Order as OrderInterface } from "../interfaces";
import { BaseModel } from './base_model';

export class Order extends BaseModel implements OrderInterface {
  public order_id: string;
  public project_id: string;
  public card_id: number;
  public status: string;
  public created_at: string;
  public  created_at_timestamp: number;
  public created_by: number;
  public created_by_email: string;
  public source_language_iso: string;
  public target_language_isos: string[];
  public keys: number[];
  public source_words: object;
  public provider_slug: string;
  public translation_style: string;
  public translation_tier: number;
  public translation_tier_name: string;
  public briefing: string;
  public total: number;
}