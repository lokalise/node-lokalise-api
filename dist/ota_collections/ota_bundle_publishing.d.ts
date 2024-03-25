import { OtaCollection } from "./ota_collection.js";
import type { OtaTeamProjectFramework } from "../types/ota.js";
export declare class OtaBundlePublishing extends OtaCollection {
    protected static prefixURI: string;
    publish(bundleId: number | string, request_params: OtaTeamProjectFramework): Promise<void>;
    stage(bundleId: number | string, request_params: OtaTeamProjectFramework): Promise<void>;
}
