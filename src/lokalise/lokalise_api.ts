import { BaseClient, ClientParams } from "./base_client.js";
import { Branches } from "../collections/branches.js";
import { Comments } from "../collections/comments.js";
import { Contributors } from "../collections/contributors.js";
import { Files } from "../collections/files.js";
import { Jwt } from "../collections/jwt.js";
import { Keys } from "../collections/keys.js";
import { Languages } from "../collections/languages.js";
import { Orders } from "../collections/orders.js";
import { PaymentCards } from "../collections/payment_cards.js";
import { Projects } from "../collections/projects.js";
import { QueuedProcesses } from "../collections/queued_processes.js";
import { Screenshots } from "../collections/screenshots.js";
import { Segments } from "../collections/segments.js";
import { Snapshots } from "../collections/snapshots.js";
import { Tasks } from "../collections/tasks.js";
import { Teams } from "../collections/teams.js";
import { TeamUsers } from "../collections/team_users.js";
import { TeamUserBillingDetails } from "../collections/team_user_billing_details.js";
import { Translations } from "../collections/translations.js";
import { TranslationProviders } from "../collections/translation_providers.js";
import { TranslationStatuses } from "../collections/translation_statuses.js";
import { UserGroups } from "../collections/user_groups.js";
import { Webhooks } from "../collections/webhooks.js";

export { ClientParams };

export class LokaliseApi extends BaseClient {
  constructor(params: ClientParams) {
    super(params);
    this.clientData.version = params.version ?? "api2";
  }

  branches(): Branches {
    return new Branches(this.clientData);
  }

  comments(): Comments {
    return new Comments(this.clientData);
  }

  contributors(): Contributors {
    return new Contributors(this.clientData);
  }

  files(): Files {
    return new Files(this.clientData);
  }

  jwt(): Jwt {
    return new Jwt(this.clientData);
  }

  keys(): Keys {
    return new Keys(this.clientData);
  }

  languages(): Languages {
    return new Languages(this.clientData);
  }

  orders(): Orders {
    return new Orders(this.clientData);
  }

  paymentCards(): PaymentCards {
    return new PaymentCards(this.clientData);
  }

  projects(): Projects {
    return new Projects(this.clientData);
  }

  queuedProcesses(): QueuedProcesses {
    return new QueuedProcesses(this.clientData);
  }

  screenshots(): Screenshots {
    return new Screenshots(this.clientData);
  }

  segments(): Segments {
    return new Segments(this.clientData);
  }

  snapshots(): Snapshots {
    return new Snapshots(this.clientData);
  }

  tasks(): Tasks {
    return new Tasks(this.clientData);
  }

  teams(): Teams {
    return new Teams(this.clientData);
  }

  teamUsers(): TeamUsers {
    return new TeamUsers(this.clientData);
  }

  teamUserBillingDetails(): TeamUserBillingDetails {
    return new TeamUserBillingDetails(this.clientData);
  }

  translations(): Translations {
    return new Translations(this.clientData);
  }

  translationProviders(): TranslationProviders {
    return new TranslationProviders(this.clientData);
  }

  translationStatuses(): TranslationStatuses {
    return new TranslationStatuses(this.clientData);
  }

  userGroups(): UserGroups {
    return new UserGroups(this.clientData);
  }

  webhooks(): Webhooks {
    return new Webhooks(this.clientData);
  }
}
