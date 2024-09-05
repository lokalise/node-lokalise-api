import type { AuthData as AuthDataInterface } from "../interfaces/auth_data.js";
import type { HttpMethod } from "../types/http_method.js";
export declare class AuthRequest {
    static createPromise(uri: string, method: HttpMethod, body: object | object[] | null, { host, version }: AuthDataInterface): Promise<any>;
    private static fetchAndHandleResponse;
    private static buildHeaders;
}
