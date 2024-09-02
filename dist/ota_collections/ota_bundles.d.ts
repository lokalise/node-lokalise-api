import { OtaBundleArchive } from "../models/ota/ota_bundle_archive.js";
import type { OtaProjectFramework, OtaRequestBundleParams } from "../types/ota.js";
import { OtaCollection } from "./ota_collection.js";
export declare class OtaBundles extends OtaCollection {
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaBundleArchive;
    get(bundle_params: OtaRequestBundleParams, request_params: OtaProjectFramework): Promise<OtaBundleArchive>;
}
