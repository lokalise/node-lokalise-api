import { BaseCollection } from './base_collection';
import { Task } from '../models/task';

export class Tasks extends BaseCollection {
  protected static rootElementName:string = 'tasks';
  protected static prefixURI:string = 'projects/{!:project_id}/tasks/{:id}';
  protected static elementClass: Object = Task;
}
