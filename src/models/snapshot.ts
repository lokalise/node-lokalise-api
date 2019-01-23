import { BaseModel } from './base_model';

export class Snapshot extends BaseModel {
  public snapshot_id: number;
  public title: string;
  public created_at: string;
  public created_by: number;
  public created_by_email: string;
}
