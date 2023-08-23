import { OtaCollection } from "./ota_collection.js";
import { OtaBundleArchive } from "../models/ota_bundle_archive.js";
type RequestBundleParams = {
    appVersion: string;
    transVersion: number;
    prerelease?: boolean;
};
type OtaProjectFramework = {
    lokaliseProjectId: string;
    framework: "ios_sdk" | "android_sdk" | "flutter_sdk";
};
export declare class OtaBundles extends OtaCollection {
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaBundleArchive;
    get(bundle_params: RequestBundleParams, request_params: OtaProjectFramework): Promise<OtaBundleArchive>;
}
export {};
