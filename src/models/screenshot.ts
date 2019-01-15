import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';

export class Screenshot extends BaseModel {
  protected static rootElementName:string = 'screenshots';
  protected static prefixURI:string = 'projects/{!:project_id}/screenshots/{:id}';
  public screenshot_id: number;
  public key_ids: string[];
  public url: string;
  public title: string;
  public description: string;
  public screenshot_tags: string[];
  public width: number;
  public height: number;
}