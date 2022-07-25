import { PaymentCard as PaymentCardInterface } from "../interfaces/payment_card.js";
import { BaseModel } from "./base_model.js";
export declare class PaymentCard extends BaseModel implements PaymentCardInterface {
    card_id: number;
    last4: string;
    brand: string;
    created_at: string;
    created_at_timestamp: number;
}
