import { BaseModel } from "./base_model";
import { Webhook as WebhookInterface } from "../interfaces/webhook";
export declare class Webhook extends BaseModel implements WebhookInterface {
    webhook_id: string;
    url: string;
    secret: string;
    events: string[];
    event_lang_map: object;
}
