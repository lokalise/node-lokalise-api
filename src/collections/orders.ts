import type { Keyable } from "../interfaces/keyable.js";
import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Order } from "../models/order.js";
import type { TeamOnly } from "../types/common_get_params.js";
import type { CreateOrderParams } from "../types/orders.js";
import type { TeamWithPagination } from "../types/teams.js";
import { BaseCollection } from "./base_collection.js";

export class Orders extends BaseCollection<Order> {
	protected static prefixURI = "teams/{!:team_id}/orders/{:id}";

	protected get elementClass(): new (
		json: Keyable,
	) => Order {
		return Order;
	}

	protected get rootElementName(): string {
		return "orders";
	}

	protected get rootElementNameSingular(): string | null {
		return null;
	}

	list(request_params: TeamWithPagination): Promise<PaginatedResult<Order>> {
		return this.doList(request_params) as Promise<PaginatedResult<Order>>;
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
