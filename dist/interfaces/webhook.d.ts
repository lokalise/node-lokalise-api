export interface Webhook {
    webhook_id: string;
    url: string;
    branch: string;
    secret: string;
    events: string[];
    event_lang_map: Array<{
        event: string;
        lang_iso_codes: string[];
    }>;
}
