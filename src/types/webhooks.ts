export type WebhookEvents =
	| "project.branch.added"
	| "project.branch.deleted"
	| "project.branch.merged"
	| "project.contributor.added"
	| "project.contributor.deleted"
	| "project.deleted"
	| "project.exported"
	| "project.imported"
	| "project.key.added"
	| "project.key.comment.added"
	| "project.key.modified"
	| "project.keys.deleted"
	| "project.language.removed"
	| "project.language.settings_changed"
	| "project.languages.added"
	| "project.snapshot"
	| "project.task.closed"
	| "project.task.created"
	| "project.task.deleted"
	| "project.task.language.closed"
	| "project.translation.proofread"
	| "project.translation.updated"
	| "team.order.completed"
	| "team.order.created"
	| "team.order.deleted";

export type WebhookEventLangMap = {
	event?: WebhookEvents;
	lang_iso_codes?: string[];
};

export type CreateWebhookParams = {
	url: string;
	branch?: string;
	events: WebhookEvents[];
	event_lang_map?: WebhookEventLangMap[];
};

export type UpdateWebhookParams = Omit<
	CreateWebhookParams,
	"url" | "events"
> & {
	url?: string;
	events?: WebhookEvents[];
};

export type WebhookDeleted = {
	project_id: string;
	webhook_deleted: boolean;
};

export type WebhookRegenerated = {
	project_id: string;
	secret: string;
};
