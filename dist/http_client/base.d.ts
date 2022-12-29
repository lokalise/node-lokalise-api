import { Options } from "got";
import { Keyable } from "../interfaces/keyable.js";
import { ClientData } from "../interfaces/client_data.js";
export declare class ApiRequest {
    promise: Promise<any>;
    params: Keyable;
    private readonly urlRoot;
    constructor(uri: string, method: Options["method"], body: object | object[] | null, params: Keyable, clientData: ClientData);
    createPromise(uri: string, method: Options["method"], body: object | object[] | null, clientData: ClientData): Promise<any>;
    protected composeURI(rawUri: string): string;
    protected mapUriParams(params: Keyable): (_entity: any, isMandaratory: string, paramName: string) => string;
}
