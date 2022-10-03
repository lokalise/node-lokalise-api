import { RequestTokenResponse as RequestTokenResponseInterface } from "../interfaces/request_token_response";
import { BaseModel } from "./base_model";
export declare class RequestTokenResponse extends BaseModel implements RequestTokenResponseInterface {
    access_token: string;
    refresh_token: string;
    expires_in: string | number;
    token_type: string;
}
