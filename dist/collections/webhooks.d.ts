import { BaseCollection } from "./base_collection.js";
import { Webhook } from "../models/webhook.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
type EventLangMap = {
    event?: string;
    lang_iso_codes?: string[];
};
type CreateWebhookParams = {
    url: string;
    branch?: string;
    events: string[];
    event_lang_map?: EventLangMap[];
};
type UpdateWebhookParams = Omit<CreateWebhookParams, "url" | "events"> & {
    url?: string;
    events?: string[];
};
type WebhookDeleted = {
    project_id: string;
    webhook_deleted: boolean;
};
type WebhookRegenerated = {
    project_id: string;
    secret: string;
};
export declare class Webhooks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Webhook;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult<Webhook>>;
    create(webhook_params: CreateWebhookParams, request_params: ProjectOnly): Promise<Webhook>;
    get(webhook_id: string | number, request_params: ProjectOnly): Promise<Webhook>;
    update(webhook_id: string | number, webhook_params: UpdateWebhookParams, request_params: ProjectOnly): Promise<Webhook>;
    delete(webhook_id: string | number, request_params: ProjectOnly): Promise<WebhookDeleted>;
    regenerate_secret(webhook_id: string | number, request_params: ProjectOnly): Promise<WebhookRegenerated>;
}
export {};
