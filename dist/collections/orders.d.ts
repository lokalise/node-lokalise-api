import { Order } from "../models/order.js";
import { BaseCollection } from "./base_collection.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import type { TeamWithPagination } from "../types/teams.js";
import type { TeamOnly } from "../types/common_get_params.js";
import type { CreateOrderParams } from "../types/orders.js";
export declare class Orders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Order;
    list(request_params: TeamWithPagination): Promise<PaginatedResult<Order>>;
    create(order_params: CreateOrderParams, request_params: TeamOnly): Promise<Order>;
    get(order_id: string | number, request_params: TeamOnly): Promise<Order>;
}
