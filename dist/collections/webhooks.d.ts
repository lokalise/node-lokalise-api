import { BaseCollection } from "./base_collection.js";
import { Webhook } from "../models/webhook.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import type { ProjectWithPagination, ProjectOnly } from "../types/common_get_params.js";
import type { CreateWebhookParams, UpdateWebhookParams, WebhookDeleted, WebhookRegenerated } from "../types/webhooks.js";
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
