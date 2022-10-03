import { RefreshTokenResponse as RefreshTokenResponseInterface } from "../interfaces/refresh_token_response";
import { BaseModel } from "./base_model";

export class RefreshTokenResponse
  extends BaseModel
  implements RefreshTokenResponseInterface
{
  declare access_token: string;
  declare scope: string;
  declare expires_in: string | number;
  declare token_type: string;
}
