import { HttpMethod } from "../types/http_method.js";
export declare class AuthRequest {
    static readonly urlRoot = "https://app.lokalise.com/oauth2/";
    static createPromise(uri: string, method: HttpMethod, body: object | object[] | null, host?: string): Promise<any>;
}
