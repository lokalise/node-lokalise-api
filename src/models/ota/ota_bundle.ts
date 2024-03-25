import { OtaBundle as OtaBundleInterface } from "../../interfaces/ota/ota_bundle.js";
import { BaseModel } from "./../base_model.js";

export class OtaBundle extends BaseModel implements OtaBundleInterface {
  declare id: number;
  declare projectId: string;
  declare isPrerelease: boolean;
  declare isProduction: boolean;
  declare createdAt: string;
  declare createdBy: string;
  declare framework: string;
  declare description: string;
  declare isFrozen: boolean;
  declare lokaliseId: number;
  declare fileId: string;
  declare fileUrl: string;
  declare modifiedAt: string;
}
