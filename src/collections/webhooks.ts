import { BaseCollection } from "./base_collection.js";
import { Webhook } from "../models/webhook.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { CreateWebhookParams } from "../types/create_webhook_params.js";
import { UpdateWebhookParams } from "../types/update_webhook_params.js";

type WebhookDeleted = {
  project_id: string;
  webhook_deleted: boolean;
};

type WebhookRegenerated = {
  project_id: string;
  secret: string;
};

export class Webhooks extends BaseCollection {
  protected static rootElementName = "webhooks";
  protected static rootElementNameSingular = "webhook";
  protected static prefixURI = "projects/{!:project_id}/webhooks/{:id}";
  protected static elementClass = Webhook;

  list(
    request_params: ProjectWithPagination,
  ): Promise<PaginatedResult<Webhook>> {
    return this.doList(request_params);
  }

  create(
    webhook_params: CreateWebhookParams,
    request_params: ProjectOnly,
  ): Promise<Webhook> {
    return this.doCreate(
      webhook_params,
      request_params,
      this.populateObjectFromJsonRoot,
    );
  }

  get(
    webhook_id: string | number,
    request_params: ProjectOnly,
  ): Promise<Webhook> {
    return this.doGet(webhook_id, request_params);
  }

  update(
    webhook_id: string | number,
    webhook_params: UpdateWebhookParams,
    request_params: ProjectOnly,
  ): Promise<Webhook> {
    return this.doUpdate(webhook_id, webhook_params, request_params);
  }

  delete(
    webhook_id: string | number,
    request_params: ProjectOnly,
  ): Promise<WebhookDeleted> {
    return this.doDelete(webhook_id, request_params);
  }

  regenerate_secret(
    webhook_id: string | number,
    request_params: ProjectOnly,
  ): Promise<WebhookRegenerated> {
    const params = {
      ...request_params,
      ...{ id: webhook_id },
    };
    return this.createPromise(
      "PATCH",
      params,
      this.returnBareJSON,
      this.handleReject,
      null,
      "projects/{!:project_id}/webhooks/{:id}/secret/regenerate",
    );
  }
}
