import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { PaymentCard } from "../models/payment_card.js";
import type { CardDeleted, CreateCardParams } from "../types/cards.js";
import type { PaginationParams } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";

export class PaymentCards extends BaseCollection<PaymentCard> {
	protected static override prefixURI = "payment_cards/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => PaymentCard {
		return PaymentCard;
	}

	protected override get rootElementName(): string {
		return "payment_cards";
	}

	protected override get rootElementNameSingular(): string | null {
		return "payment_card";
	}

	list(
		request_params: PaginationParams = {},
	): Promise<PaginatedResult<PaymentCard>> {
		return this.doList(request_params) as Promise<PaginatedResult<PaymentCard>>;
	}

	create(card_params: CreateCardParams): Promise<PaymentCard> {
		return this.doCreate(card_params);
	}

	get(card_id: string | number): Promise<PaymentCard> {
		return this.doGet(card_id);
	}

	delete(card_id: string | number): Promise<CardDeleted> {
		return this.doDelete(card_id);
	}
}
