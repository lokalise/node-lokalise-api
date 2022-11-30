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
export declare class Orders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Order;
    list(request_params: TeamWithPagination): Promise<PaginatedResult<Order>>;
    create(order_params: OrderParams, request_params: TeamOnly): Promise<Order>;
    get(order_id: string | number, request_params: TeamOnly): Promise<Order>;
}
export {};
