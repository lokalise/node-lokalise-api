import { BaseCollection } from "./base_collection";
import { File } from "../models/file";
import { QueuedProcess } from "../models/queued_process";
import { UploadFileParams } from "../interfaces/upload_file_params";
import { DownloadFileParams } from "../interfaces/download_file_params";
import { Keyable } from "../interfaces/keyable";

export class Files extends BaseCollection {
  protected static rootElementName: string = "files";
  protected static prefixURI: string = "projects/{!:project_id}/files/{:id}";
  protected static elementClass: object = File;

  protected static secondaryElementNameSingular: string = "process";
  protected static secondaryElementClass: object = QueuedProcess;

  upload(project_id: string, upload: UploadFileParams): Promise<QueuedProcess> {
    return this.createPromise(
      "POST",
      { project_id: project_id },
      this.populateSecondaryObjectFromJsonRoot,
      this.handleReject,
      upload,
      "projects/{!:project_id}/files/upload"
    );
  }

  download(project_id: string, download: DownloadFileParams): Promise<Keyable> {
    return this.createPromise(
      "POST",
      { project_id: project_id },
      this.returnBareJSON,
      this.handleReject,
      download,
      "projects/{!:project_id}/files/download"
    );
  }
}
