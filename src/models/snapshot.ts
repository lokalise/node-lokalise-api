import { BaseModel } from './base_model';
import { Snapshot as SnapshotInterface } from "../interfaces";

export class Snapshot extends BaseModel implements SnapshotInterface {
  public snapshot_id: number;
  public title: string;
  public created_at: string;
  public created_at_timestamp: number;
  public created_by: number;
  public created_by_email: string;
}
