export type WebhookEventLangMap = {
    event?: string;
    lang_iso_codes?: string[];
};
export type CreateWebhookParams = {
    url: string;
    branch?: string;
    events: string[];
    event_lang_map?: WebhookEventLangMap[];
};
export type UpdateWebhookParams = Omit<CreateWebhookParams, "url" | "events"> & {
    url?: string;
    events?: string[];
};
export type WebhookDeleted = {
    project_id: string;
    webhook_deleted: boolean;
};
export type WebhookRegenerated = {
    project_id: string;
    secret: string;
};
