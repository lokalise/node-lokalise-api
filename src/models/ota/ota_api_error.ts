import { OtaApiError as OtaApiErrorInterface } from "../../interfaces/ota/ota_api_error.js";
import { BaseModel } from "../base_model.js";

export class OtaApiError extends BaseModel implements OtaApiErrorInterface {
  declare statusCode: string;
  declare message: string;
  declare error: string;
}
