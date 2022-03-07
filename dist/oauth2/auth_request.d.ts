import { Options } from "got";
import { AuthData } from "../interfaces/auth_data";
export declare class AuthRequest {
    static urlRoot: NonNullable<Options["prefixUrl"]>;
    promise: Promise<any>;
    params: object;
    constructor(uri: string, method: Options["method"], body: object | object[] | null, params: object, clientData: AuthData);
    createPromise(uri: string, method: Options["method"], body: object | object[] | null, authData: AuthData): Promise<any>;
}
