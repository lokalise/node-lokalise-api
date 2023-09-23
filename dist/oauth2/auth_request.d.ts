import { HttpMethod } from "../types/http_method.js";
import { AuthData as AuthDataInterface } from "../interfaces/auth_data.js";
export declare class AuthRequest {
    static createPromise(uri: string, method: HttpMethod, body: object | object[] | null, clientData: AuthDataInterface): Promise<any>;
}
