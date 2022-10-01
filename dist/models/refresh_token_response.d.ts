import { RefreshTokenResponse as RefreshTokenResponseInterface } from "../interfaces/refresh_token_response";
import { BaseModel } from "./base_model";
export declare class RefreshTokenResponse extends BaseModel implements RefreshTokenResponseInterface {
    access_token: string;
    scope: string;
    expires_in: string | number;
    token_type: string;
}
