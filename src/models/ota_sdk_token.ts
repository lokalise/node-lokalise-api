import { BaseModel } from "./base_model.js";
import { OtaSdkToken as OtaSdkTokenInterface } from "../interfaces/ota_sdk_token.js";

export class OtaSdkToken extends BaseModel implements OtaSdkTokenInterface {
  declare id: number;
  declare token: string;
  declare projectId: number;
  declare lokaliseId: number;
  declare createdAt: string;
}
