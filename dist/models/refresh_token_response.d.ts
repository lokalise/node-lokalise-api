import { RefreshTokenResponse as RefreshTokenResponseInterface } from "../interfaces/refresh_token_response.js";
import { BaseModel } from "./base_model.js";
export declare class RefreshTokenResponse extends BaseModel implements RefreshTokenResponseInterface {
    access_token: string;
    scope: string;
    expires_in: string | number;
    token_type: string;
}
