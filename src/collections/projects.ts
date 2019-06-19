import { Project } from '../models/project';
import { BaseCollection } from './base_collection';

export class Projects extends BaseCollection {
  protected static rootElementName:string = 'projects';
  protected static prefixURI:string = 'projects/{:id}';
  protected static elementClass: Object = Project;

  empty(project_id) {
    return this.createPromise('PUT', { project_id: project_id},
      this.populateObjectFromJson, this.handleReject, null, 'projects/{!:project_id}/empty');
  }
}
