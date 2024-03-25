import { Order } from "../models/order.js";
import { BaseCollection } from "./base_collection.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import type { TeamWithPagination } from "../types/teams.js";
import type { TeamOnly } from "../types/common_get_params.js";
import type { CreateOrderParams } from "../types/orders.js";

export class Orders extends BaseCollection {
  protected static rootElementName = "orders";
  protected static prefixURI = "teams/{!:team_id}/orders/{:id}";
  protected static elementClass = Order;

  list(request_params: TeamWithPagination): Promise<PaginatedResult<Order>> {
    return this.doList(request_params);
  }

  create(
    order_params: CreateOrderParams,
    request_params: TeamOnly,
  ): Promise<Order> {
    return this.doCreate(
      order_params,
      request_params,
      this.populateObjectFromJsonRoot,
    );
  }

  get(order_id: string | number, request_params: TeamOnly): Promise<Order> {
    return this.doGet(order_id, request_params);
  }
}
