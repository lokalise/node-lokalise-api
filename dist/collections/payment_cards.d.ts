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
export declare class PaymentCards extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof PaymentCard;
    list(request_params?: PaginationParams): Promise<PaginatedResult<PaymentCard>>;
    create(card_params: CardParams): Promise<PaymentCard>;
    get(card_id: string | number): Promise<PaymentCard>;
    delete(card_id: string | number): Promise<CardDeleted>;
}
export {};
