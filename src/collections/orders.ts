import { Order } from "../models/order.js";
import { BaseCollection } from "./base_collection.js";
import { TeamWithPagination } from "../interfaces/team_with_pagination.js";
import { TeamOnly } from "../interfaces/team_only.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { CreateOrderParams } from "../types/create_order_params.js";

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
