import { Branches } from "../collections/branches.js";
import { Comments } from "../collections/comments.js";
import { Contributors } from "../collections/contributors.js";
import { Files } from "../collections/files.js";
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
export class LokaliseApi {
    clientData = {
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
    constructor(params) {
        const apiKey = params["apiKey"];
        if (apiKey === null || apiKey === undefined || apiKey.length === 0) {
            throw new Error("Error: Instantiation failed: Please pass an API key");
        }
        this.clientData.token = apiKey;
        const compression = params["enableCompression"];
        if (compression !== null && compression !== undefined) {
            this.clientData.enableCompression = compression;
        }
        this.clientData.host = params.host;
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