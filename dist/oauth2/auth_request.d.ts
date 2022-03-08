import { Options } from "got";
export declare class AuthRequest {
    static urlRoot: NonNullable<Options["prefixUrl"]>;
    static createPromise(uri: string, method: Options["method"], body: object | object[] | null): Promise<any>;
}
