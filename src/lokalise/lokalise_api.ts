import {
	Branches,
	Comments,
	Contributors,
	Files,
	GlossaryTerms,
	Jwt,
	Keys,
	Languages,
	Orders,
	PaymentCards,
	PermissionTemplates,
	Projects,
	QueuedProcesses,
	Screenshots,
	Segments,
	Snapshots,
	Tasks,
	Teams,
	TeamUserBillingDetails,
	TeamUsers,
	TranslationProviders,
	TranslationStatuses,
	Translations,
	UserGroups,
	Webhooks,
} from "../collections/index.js";

import type { ClientParams } from "../interfaces/client_params.js";
import { BaseClient } from "./base_client.js";

/**
 * A main entry point for interacting with the Lokalise API.
 * Provides easy access to various resource collections (Branches, Comments, Projects, etc.)
 * through dedicated methods.
 */
export class LokaliseApi extends BaseClient {
	/**
	 * Creates a new instance of the LokaliseApi client.
	 * @param params - Configuration parameters including `apiKey` and optional `version`, `host`, etc.
	 */
	constructor(params: ClientParams) {
		super(params);

		// Default to "api2" version if not explicitly provided
		this.clientData.version = params.version ?? "api2";
		this.clientData.authHeader = params.header ?? this.clientData.authHeader;
	}

	/**
	 * Access Branch-related endpoints.
	 */
	branches(): Branches {
		return new Branches(this.clientData);
	}

	/**
	 * Access Comment-related endpoints.
	 */
	comments(): Comments {
		return new Comments(this.clientData);
	}

	/**
	 * Access Contributor-related endpoints.
	 */
	contributors(): Contributors {
		return new Contributors(this.clientData);
	}

	/**
	 * Access File-related endpoints.
	 */
	files(): Files {
		return new Files(this.clientData);
	}

	/**
	 * Access Glossary-related endpoints.
	 */
	glossaryTerms(): GlossaryTerms {
		return new GlossaryTerms(this.clientData);
	}

	/**
	 * Access JWT-related endpoints.
	 */
	jwt(): Jwt {
		return new Jwt(this.clientData);
	}

	/**
	 * Access Key-related endpoints.
	 */
	keys(): Keys {
		return new Keys(this.clientData);
	}

	/**
	 * Access Language-related endpoints.
	 */
	languages(): Languages {
		return new Languages(this.clientData);
	}

	/**
	 * Access Order-related endpoints.
	 */
	orders(): Orders {
		return new Orders(this.clientData);
	}

	/**
	 * Access Payment Card-related endpoints.
	 */
	paymentCards(): PaymentCards {
		return new PaymentCards(this.clientData);
	}

	/**
	 * Access Permission Template-related endpoints.
	 */
	permissionTemplates(): PermissionTemplates {
		return new PermissionTemplates(this.clientData);
	}

	/**
	 * Access Project-related endpoints.
	 */
	projects(): Projects {
		return new Projects(this.clientData);
	}

	/**
	 * Access Queued Process-related endpoints.
	 */
	queuedProcesses(): QueuedProcesses {
		return new QueuedProcesses(this.clientData);
	}

	/**
	 * Access Screenshot-related endpoints.
	 */
	screenshots(): Screenshots {
		return new Screenshots(this.clientData);
	}

	/**
	 * Access Segment-related endpoints.
	 */
	segments(): Segments {
		return new Segments(this.clientData);
	}

	/**
	 * Access Snapshot-related endpoints.
	 */
	snapshots(): Snapshots {
		return new Snapshots(this.clientData);
	}

	/**
	 * Access Task-related endpoints.
	 */
	tasks(): Tasks {
		return new Tasks(this.clientData);
	}

	/**
	 * Access Team-related endpoints.
	 */
	teams(): Teams {
		return new Teams(this.clientData);
	}

	/**
	 * Access Team User-related endpoints.
	 */
	teamUsers(): TeamUsers {
		return new TeamUsers(this.clientData);
	}

	/**
	 * Access Team User Billing Detail-related endpoints.
	 */
	teamUserBillingDetails(): TeamUserBillingDetails {
		return new TeamUserBillingDetails(this.clientData);
	}

	/**
	 * Access Translation-related endpoints.
	 */
	translations(): Translations {
		return new Translations(this.clientData);
	}

	/**
	 * Access Translation Provider-related endpoints.
	 */
	translationProviders(): TranslationProviders {
		return new TranslationProviders(this.clientData);
	}

	/**
	 * Access Translation Status-related endpoints.
	 */
	translationStatuses(): TranslationStatuses {
		return new TranslationStatuses(this.clientData);
	}

	/**
	 * Access User Group-related endpoints.
	 */
	userGroups(): UserGroups {
		return new UserGroups(this.clientData);
	}

	/**
	 * Access Webhook-related endpoints.
	 */
	webhooks(): Webhooks {
		return new Webhooks(this.clientData);
	}
}
