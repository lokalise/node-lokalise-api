import { ClientData as ClientDataInterface } from "../interfaces/client_data.js";
export type ClientParams = {
    apiKey?: string;
    enableCompression?: boolean;
    tokenType?: string;
    host?: string;
};
export declare class BaseClient {
    readonly clientData: ClientDataInterface;
    constructor(params: ClientParams);
}
