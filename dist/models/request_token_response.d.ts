import { RequestTokenResponse as RequestTokenResponseInterface } from "../interfaces/request_token_response.js";
import { BaseModel } from "./base_model.js";
export declare class RequestTokenResponse extends BaseModel implements RequestTokenResponseInterface {
    access_token: string;
    refresh_token: string;
    expires_in: string | number;
    token_type: string;
}
