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
export class LokaliseApi {
    /**
     * Instantiate LokaliseApi to have access to methods
     * @param params  object, mandatory
     * @returns       LokaliseApi object to work with.
     */
    constructor(params) {
        this.clientData = {
            token: "",
            tokenType: "",
            authHeader: "x-api-token",
            enableCompression: false,
        };
        const apiKey = Object(params)["apiKey"];
        if (apiKey == null || apiKey.length == 0) {
            throw new Error("Error: Instantiation failed: Please pass an API key");
        }
        this.clientData.token = apiKey;
        const compression = Object(params)["enableCompression"];
        if (compression != null) {
            this.clientData.enableCompression = compression;
        }
    }
    branches() {
        return new Branches(this.clientData);
    }
    comments() {
        return new Comments(this.clientData);
    }
    contributors() {
        return new Contributors(this.clientData);
    }
    files() {
        return new Files(this.clientData);
    }
    keys() {
        return new Keys(this.clientData);
    }
    languages() {
        return new Languages(this.clientData);
    }
    orders() {
        return new Orders(this.clientData);
    }
    paymentCards() {
        return new PaymentCards(this.clientData);
    }
    projects() {
        return new Projects(this.clientData);
    }
    queuedProcesses() {
        return new QueuedProcesses(this.clientData);
    }
    screenshots() {
        return new Screenshots(this.clientData);
    }
    segments() {
        return new Segments(this.clientData);
    }
    snapshots() {
        return new Snapshots(this.clientData);
    }
    tasks() {
        return new Tasks(this.clientData);
    }
    teams() {
        return new Teams(this.clientData);
    }
    teamUsers() {
        return new TeamUsers(this.clientData);
    }
    teamUserBillingDetails() {
        return new TeamUserBillingDetails(this.clientData);
    }
    translations() {
        return new Translations(this.clientData);
    }
    translationProviders() {
        return new TranslationProviders(this.clientData);
    }
    translationStatuses() {
        return new TranslationStatuses(this.clientData);
    }
    userGroups() {
        return new UserGroups(this.clientData);
    }
    webhooks() {
        return new Webhooks(this.clientData);
    }
}
//# sourceMappingURL=lokalise_api.js.map