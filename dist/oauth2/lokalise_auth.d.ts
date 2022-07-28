import { AuthData as AuthDataInterface } from "../interfaces/auth_data";
export declare class LokaliseAuth {
    authData: AuthDataInterface;
    constructor(clientId: string, clientSecret: string, host?: string);
    auth(scope: string | string[], redirect_uri?: string, state?: string): string;
    token(code: string): Promise<any>;
    refresh(refresh_token: string): Promise<any>;
    private doRequest;
    private buildUrl;
    private base_params;
    private handleReject;
}
