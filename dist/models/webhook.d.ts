import { BaseModel } from "./base_model.js";
import { Webhook as WebhookInterface } from "../interfaces/webhook.js";
export declare class Webhook extends BaseModel implements WebhookInterface {
    webhook_id: string;
    branch: string;
    url: string;
    secret: string;
    events: string[];
    event_lang_map: Array<{
        event: string;
        lang_iso_codes: string[];
    }>;
}
