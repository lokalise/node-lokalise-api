import type { Keyable } from "../interfaces/keyable.js";
import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Webhook } from "../models/webhook.js";
import type {
	ProjectOnly,
	ProjectWithPagination,
} from "../types/common_get_params.js";
import type {
	CreateWebhookParams,
	UpdateWebhookParams,
	WebhookDeleted,
	WebhookRegenerated,
} from "../types/webhooks.js";
import { BaseCollection } from "./base_collection.js";

export class Webhooks extends BaseCollection<Webhook> {
	protected static override prefixURI =
		"projects/{!:project_id}/webhooks/{:id}";

	protected get elementClass(): new (
		json: Keyable,
	) => Webhook {
		return Webhook;
	}

	protected override get rootElementName(): string {
		return "webhooks";
	}

	protected override get rootElementNameSingular(): string | null {
		return "webhook";
	}

	list(
		request_params: ProjectWithPagination,
	): Promise<PaginatedResult<Webhook>> {
		return this.doList(request_params) as Promise<PaginatedResult<Webhook>>;
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
			this.returnBareJSON<WebhookRegenerated>,
			null,
			"projects/{!:project_id}/webhooks/{:id}/secret/regenerate",
		);
	}
}
