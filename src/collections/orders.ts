import { Order } from "../models/order.js";
import { BaseCollection } from "./base_collection.js";
import { TeamWithPagination } from "../interfaces/team_with_pagination.js";
import { TeamOnly } from "../interfaces/team_only.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";

type OrderParams = {
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

export class Orders extends BaseCollection {
  protected static rootElementName = "orders";
  protected static prefixURI = "teams/{!:team_id}/orders/{:id}";
  protected static elementClass = Order;

  list(request_params: TeamWithPagination): Promise<PaginatedResult<Order>> {
    return this.doList(request_params);
  }

  create(order_params: OrderParams, request_params: TeamOnly): Promise<Order> {
    return this.doCreate(
      order_params,
      request_params,
      this.populateObjectFromJsonRoot
    );
  }

  get(order_id: string | number, request_params: TeamOnly): Promise<Order> {
    return this.doGet(order_id, request_params);
  }
}
