import { AuthData as AuthDataInterface } from "../interfaces/auth_data";
export declare class LokaliseAuth {
    authData: AuthDataInterface;
    constructor(clientId: string, clientSecret: string);
    auth(scope: string | string[], redirect_uri?: string | null, state?: string | null): string;
    private buildUrl;
}
