import type { OtaBundleArchive as OtaBundleArchiveInterface } from "../../interfaces/ota/ota_bundle_archive.js";
import { BaseModel } from "./../base_model.js";
export declare class OtaBundleArchive extends BaseModel implements OtaBundleArchiveInterface {
    url: string;
    version: number;
}
