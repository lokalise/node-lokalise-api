import { BaseModel } from "./base_model.js";
import { Snapshot as SnapshotInterface } from "../interfaces/snapshot.js";
export declare class Snapshot extends BaseModel implements SnapshotInterface {
    snapshot_id: number;
    title: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
}
