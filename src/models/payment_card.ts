import type { PaymentCard as PaymentCardInterface } from "../interfaces/payment_card.js";
import { BaseModel } from "./base_model.js";

export class PaymentCard extends BaseModel implements PaymentCardInterface {
	declare card_id: number;
	declare last4: string;
	declare brand: string;
	declare created_at: string;
	declare created_at_timestamp: number;
}
