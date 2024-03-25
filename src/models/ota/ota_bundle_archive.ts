import { OtaBundleArchive as OtaBundleArchiveInterface } from "../../interfaces/ota/ota_bundle_archive.js";
import { BaseModel } from "./../base_model.js";

export class OtaBundleArchive
  extends BaseModel
  implements OtaBundleArchiveInterface
{
  declare url: string;
  declare version: number;
}
