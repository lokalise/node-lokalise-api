import { Options } from "got";
import { Keyable, WritableKeyable } from "../interfaces/keyable.js";
import { ClientData } from "../interfaces/client_data.js";
export declare class ApiRequest {
    promise: Promise<any>;
    params: WritableKeyable;
    protected readonly urlRoot: NonNullable<Options["prefixUrl"]>;
    constructor(uri: string, method: Options["method"], body: object | object[] | null, params: Keyable, clientData: ClientData);
    protected createPromise(uri: string, method: Options["method"], body: object | object[] | null, clientData: ClientData): Promise<any>;
    protected getErrorFromResp(respJson: any): any;
    protected composeURI(rawUri: string): string;
    protected mapUriParams(): (_entity: any, isMandaratory: string, paramName: string) => string;
}
