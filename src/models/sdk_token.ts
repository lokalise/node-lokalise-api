import { BaseModel } from "./base_model.js";
import { SdkToken as SdkTokenInterface } from "../interfaces/sdk_token.js";

export class SdkToken extends BaseModel implements SdkTokenInterface {
  declare id: number;
  declare token: string;
  declare projectId: number;
  declare lokaliseId: number;
  declare createdAt: string;
}
