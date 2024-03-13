import { WebhookEventLangMap } from "./webhook_event_lang_map.js";
export type CreateWebhookParams = {
    url: string;
    branch?: string;
    events: string[];
    event_lang_map?: WebhookEventLangMap[];
};
