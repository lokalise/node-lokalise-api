import { BaseCollection } from './base_collection';
import { File } from '../models/file';
import { UploadFileParams } from '../interfaces/upload_file_params';
import { DownloadFileParams } from '../interfaces/download_file_params';

export class Files extends BaseCollection {
  protected static rootElementName:string = 'files';
  protected static prefixURI:string = 'projects/{!:project_id}/files/{:id}';
  protected static elementClass: Object = File;

  upload(project_id: string, upload: UploadFileParams) {
    return this.createPromise('POST', { project_id: project_id}, this.returnBareJSON,
      this.handleReject, upload, 'projects/{!:project_id}/files/upload');
  }

  download(project_id: string, download: DownloadFileParams) {
    return this.createPromise('POST', { project_id: project_id }, this.returnBareJSON,
      this.handleReject, download, 'projects/{!:project_id}/files/download');
  }
}
