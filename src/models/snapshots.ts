import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';

export class Snapshots extends BaseModel {
  protected static rootElementName:string = 'snapshot';
  protected static prefixURI:string = 'projects/{!:project_id}/snapshots/{:id}';
  public snapshot_id: number;
  public title: string;
  public created_at: string;
  public created_by: number;
  public created_by_email: string;
}
