import { OtaCollection } from "./ota_collection.js";
import { OtaBundleArchive } from "../models/ota_bundle_archive.js";
import { OtaFramework } from "../interfaces/ota_framework.js";
type RequestBundleParams = {
    appVersion: string;
    transVersion: number;
    prerelease?: boolean;
};
interface OtaProjectFramework extends OtaFramework {
    lokaliseProjectId: string;
}
export declare class OtaBundles extends OtaCollection {
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaBundleArchive;
    get(bundle_params: RequestBundleParams, request_params: OtaProjectFramework): Promise<OtaBundleArchive>;
}
export {};
