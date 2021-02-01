import { Options } from "got";
import { StandartParams } from "../interfaces/standart_params";
export declare class ApiRequest {
    private urlRoot;
    promise: Promise<any>;
    params: StandartParams;
    constructor(uri: string, method: Options["method"], body: object | object[] | null, params: StandartParams);
    createPromise(uri: string, method: Options["method"], body: object | object[] | null): Promise<any>;
    protected composeURI(uri: string): string;
    protected mapUriParams(params: StandartParams): (_entity: any, isMandaratory: any, paramName: string) => string;
}
