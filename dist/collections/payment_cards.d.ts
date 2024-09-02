import { PaginatedResult } from "../interfaces/paginated_result.js";
import { PaymentCard } from "../models/payment_card.js";
import type { CardDeleted, CreateCardParams } from "../types/cards.js";
import type { PaginationParams } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";
export declare class PaymentCards extends BaseCollection {
	protected static rootElementName: string;
	protected static rootElementNameSingular: string;
	protected static prefixURI: string;
	protected static elementClass: typeof PaymentCard;
	list(
		request_params?: PaginationParams,
	): Promise<PaginatedResult<PaymentCard>>;
	create(card_params: CreateCardParams): Promise<PaymentCard>;
	get(card_id: string | number): Promise<PaymentCard>;
	delete(card_id: string | number): Promise<CardDeleted>;
}
