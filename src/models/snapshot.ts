import type { Snapshot as SnapshotInterface } from "../interfaces/snapshot.js";
import { BaseModel } from "./base_model.js";

export class Snapshot extends BaseModel implements SnapshotInterface {
	declare snapshot_id: number;
	declare title: string;
	declare created_at: string;
	declare created_at_timestamp: number;
	declare created_by: number;
	declare created_by_email: string;
}
