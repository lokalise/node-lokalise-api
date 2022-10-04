import { PaymentCard } from "../models/payment_card.js";
import { BaseCollection } from "./base_collection.js";
import { PaginationParams } from "../interfaces/pagination_params.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";

type CardParams = {
  number: string;
  cvc: string | number;
  exp_month: string | number;
  exp_year: string | number;
};

type CardDeleted = {
  card_id: string;
  card_deleted: boolean;
};

export class PaymentCards extends BaseCollection {
  protected static rootElementName = "payment_cards";
  protected static rootElementNameSingular = "payment_card";
  protected static prefixURI = "payment_cards/{:id}";
  protected static elementClass = PaymentCard;

  list(
    request_params: PaginationParams = {}
  ): Promise<PaginatedResult<PaymentCard>> {
    return this.doList(request_params);
  }

  create(card_params: CardParams): Promise<PaymentCard> {
    return this.doCreate(card_params);
  }

  get(card_id: string | number): Promise<PaymentCard> {
    return this.doGet(card_id);
  }

  delete(card_id: string | number): Promise<CardDeleted> {
    return this.doDelete(card_id);
  }
}
