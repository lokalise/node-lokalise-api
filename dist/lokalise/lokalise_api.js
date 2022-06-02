"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokaliseApi = void 0;
const branches_1 = require("../collections/branches");
const comments_1 = require("../collections/comments");
const contributors_1 = require("../collections/contributors");
const files_1 = require("../collections/files");
const keys_1 = require("../collections/keys");
const languages_1 = require("../collections/languages");
const orders_1 = require("../collections/orders");
const payment_cards_1 = require("../collections/payment_cards");
const projects_1 = require("../collections/projects");
const queued_processes_1 = require("../collections/queued_processes");
const screenshots_1 = require("../collections/screenshots");
const segments_1 = require("../collections/segments");
const snapshots_1 = require("../collections/snapshots");
const tasks_1 = require("../collections/tasks");
const teams_1 = require("../collections/teams");
const team_users_1 = require("../collections/team_users");
const team_user_billing_details_1 = require("../collections/team_user_billing_details");
const translations_1 = require("../collections/translations");
const translation_providers_1 = require("../collections/translation_providers");
const translation_statuses_1 = require("../collections/translation_statuses");
const user_groups_1 = require("../collections/user_groups");
const webhooks_1 = require("../collections/webhooks");
class LokaliseApi {
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
        if (apiKey == null || apiKey.length == 0) {
            throw new Error("Error: Instantiation failed: Please pass an API key");
        }
        this.clientData.token = apiKey;
        const compression = params["enableCompression"];
        if (compression != null) {
            this.clientData.enableCompression = compression;
        }
    }
    branches() {
        return new branches_1.Branches(this.clientData);
    }
    comments() {
        return new comments_1.Comments(this.clientData);
    }
    contributors() {
        return new contributors_1.Contributors(this.clientData);
    }
    files() {
        return new files_1.Files(this.clientData);
    }
    keys() {
        return new keys_1.Keys(this.clientData);
    }
    languages() {
        return new languages_1.Languages(this.clientData);
    }
    orders() {
        return new orders_1.Orders(this.clientData);
    }
    paymentCards() {
        return new payment_cards_1.PaymentCards(this.clientData);
    }
    projects() {
        return new projects_1.Projects(this.clientData);
    }
    queuedProcesses() {
        return new queued_processes_1.QueuedProcesses(this.clientData);
    }
    screenshots() {
        return new screenshots_1.Screenshots(this.clientData);
    }
    segments() {
        return new segments_1.Segments(this.clientData);
    }
    snapshots() {
        return new snapshots_1.Snapshots(this.clientData);
    }
    tasks() {
        return new tasks_1.Tasks(this.clientData);
    }
    teams() {
        return new teams_1.Teams(this.clientData);
    }
    teamUsers() {
        return new team_users_1.TeamUsers(this.clientData);
    }
    teamUserBillingDetails() {
        return new team_user_billing_details_1.TeamUserBillingDetails(this.clientData);
    }
    translations() {
        return new translations_1.Translations(this.clientData);
    }
    translationProviders() {
        return new translation_providers_1.TranslationProviders(this.clientData);
    }
    translationStatuses() {
        return new translation_statuses_1.TranslationStatuses(this.clientData);
    }
    userGroups() {
        return new user_groups_1.UserGroups(this.clientData);
    }
    webhooks() {
        return new webhooks_1.Webhooks(this.clientData);
    }
}
exports.LokaliseApi = LokaliseApi;
//# sourceMappingURL=lokalise_api.js.map