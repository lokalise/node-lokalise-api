import { Order } from "../models/order.js";
import { BaseCollection } from "./base_collection.js";
import { TeamWithPagination } from "../interfaces/team_with_pagination.js";
import { TeamOnly } from "../interfaces/team_only.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { CreateOrderParams } from "../types/create_order_params.js";
export declare class Orders extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Order;
    list(request_params: TeamWithPagination): Promise<PaginatedResult<Order>>;
    create(order_params: CreateOrderParams, request_params: TeamOnly): Promise<Order>;
    get(order_id: string | number, request_params: TeamOnly): Promise<Order>;
}
