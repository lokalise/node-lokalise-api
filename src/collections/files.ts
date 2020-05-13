import { BaseCollection } from './base_collection';
import { File } from '../models/file';
import { QueuedProcess } from '../models/queued_process';
import { UploadFileParams } from '../interfaces/upload_file_params';
import { DownloadFileParams } from '../interfaces/download_file_params';

export class Files extends BaseCollection {
  protected static rootElementName: string = 'files';
  protected static prefixURI: string = 'projects/{!:project_id}/files/{:id}';
  protected static elementClass: Object = File;

  protected static secondaryElementNameSingular: string = 'process';
  protected static secondaryElementClass: Object = QueuedProcess;

  upload(project_id: string, upload: UploadFileParams): Promise<any> {
    return this.createPromise('POST', { project_id: project_id },
      this.choosePopulator(upload),
      this.handleReject, upload, 'projects/{!:project_id}/files/upload');
  }

  download(project_id: string, download: DownloadFileParams): Promise<any> {
    return this.createPromise('POST', { project_id: project_id }, this.returnBareJSON,
      this.handleReject, download, 'projects/{!:project_id}/files/download');
  }

  private choosePopulator(uploadParams: UploadFileParams): any {
    // Temporary solution for backwards compatibility with sync file uploading
    // Sync uploading will be removed by summer 2020
    if (uploadParams.queue) {
      return this.populateSecondaryObjectFromJsonRoot
    } else {
      return this.returnBareJSON
    }
  }
}
