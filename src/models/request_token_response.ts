import type { RequestTokenResponse as RequestTokenResponseInterface } from "../interfaces/request_token_response.js";
import { BaseModel } from "./base_model.js";

export class RequestTokenResponse
	extends BaseModel
	implements RequestTokenResponseInterface
{
	declare access_token: string;
	declare refresh_token: string;
	declare expires_in: string | number;
	declare token_type: string;
}
