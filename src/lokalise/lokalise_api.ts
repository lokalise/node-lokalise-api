import { Branches } from "../collections/branches";
import { Comments } from "../collections/comments";
import { Contributors } from "../collections/contributors";
import { Files } from "../collections/files";
import { Keys } from "../collections/keys";
import { Languages } from "../collections/languages";
import { Orders } from "../collections/orders";
import { PaymentCards } from "../collections/payment_cards";
import { Projects } from "../collections/projects";
import { QueuedProcesses } from "../collections/queued_processes";
import { Screenshots } from "../collections/screenshots";
import { Segments } from "../collections/segments";
import { Snapshots } from "../collections/snapshots";
import { Tasks } from "../collections/tasks";
import { Teams } from "../collections/teams";
import { TeamUsers } from "../collections/team_users";
import { TeamUserBillingDetails } from "../collections/team_user_billing_details";
import { Translations } from "../collections/translations";
import { TranslationProviders } from "../collections/translation_providers";
import { TranslationStatuses } from "../collections/translation_statuses";
import { UserGroups } from "../collections/user_groups";
import { Webhooks } from "../collections/webhooks";
import { ClientData as ClientDataInterface } from "../interfaces/client_data";

export type ClientParams = {
  apiKey: string;
  enableCompression?: boolean;
  tokenType?: string;
};

export class LokaliseApi {
  readonly clientData: ClientDataInterface = {
    token: "",
    tokenType: "",
    authHeader: "x-api-token",
    enableCompression: false,
  };

  /*
   * Instantiate LokaliseApi to call API methods
   * @param params  object, mandatory
   * @returns       LokaliseApi object to work with.
   */
  constructor(params: ClientParams) {
    const apiKey = params["apiKey"];
    if (apiKey === null || apiKey === undefined || apiKey.length === 0) {
      throw new Error("Error: Instantiation failed: Please pass an API key");
    }
    this.clientData.token = apiKey;
    const compression = params["enableCompression"];
    if (compression !== null && compression !== undefined) {
      this.clientData.enableCompression = compression;
    }
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
