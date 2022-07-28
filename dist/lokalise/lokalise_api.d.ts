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
export declare type ClientParams = {
    host?: string;
    apiKey?: string;
    enableCompression?: boolean;
    tokenType?: string;
};
export declare class LokaliseApi {
    readonly clientData: ClientDataInterface;
    constructor(params: ClientParams);
    branches(): Branches;
    comments(): Comments;
    contributors(): Contributors;
    files(): Files;
    keys(): Keys;
    languages(): Languages;
    orders(): Orders;
    paymentCards(): PaymentCards;
    projects(): Projects;
    queuedProcesses(): QueuedProcesses;
    screenshots(): Screenshots;
    segments(): Segments;
    snapshots(): Snapshots;
    tasks(): Tasks;
    teams(): Teams;
    teamUsers(): TeamUsers;
    teamUserBillingDetails(): TeamUserBillingDetails;
    translations(): Translations;
    translationProviders(): TranslationProviders;
    translationStatuses(): TranslationStatuses;
    userGroups(): UserGroups;
    webhooks(): Webhooks;
}
