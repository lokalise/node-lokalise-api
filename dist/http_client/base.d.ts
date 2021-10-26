import { Options } from "got";
import { StandartParams } from "../interfaces/standart_params";
import { ClientData } from "../interfaces/client_data";
export declare class ApiRequest {
    private urlRoot;
    promise: Promise<any>;
    params: StandartParams;
    constructor(uri: string, method: Options["method"], body: object | object[] | null, params: StandartParams, clientData: ClientData);
    createPromise(uri: string, method: Options["method"], body: object | object[] | null, clientData: ClientData): Promise<any>;
    protected composeURI(uri: string): string;
    protected mapUriParams(params: StandartParams): (_entity: any, isMandaratory: any, paramName: string) => string;
}
