import { QueuedProcess } from '../models/queued_process';
import { BaseCollection } from './base_collection';
import { StandartParams } from '../interfaces/standart_params';

export class QueuedProcesses extends BaseCollection {
  protected static rootElementName: string = 'processes';
  protected static rootElementNameSingular: string = 'process';
  protected static prefixURI: string = 'projects/{!:project_id}/processes/{:id}';
  protected static elementClass: Object = QueuedProcess;

  getDetailed(id: any, params: StandartParams = {}, type: string = 'file-import'): Promise<any> {
    params['id'] = id;
    return this.createPromise('GET', params, this.populateObjectFromJsonRoot,
      this.handleReject, null,
      `projects/{!:project_id}/processes/${type}/{:id}`)
  }
}
