import { BaseCollection } from "./base_collection.js";
import { File } from "../models/file.js";
import { QueuedProcess } from "../models/queued_process.js";
import { UploadFileParams } from "../interfaces/upload_file_params.js";
import { DownloadFileParams } from "../interfaces/download_file_params.js";
import { Keyable } from "../interfaces/keyable.js";

export class Files extends BaseCollection {
  protected static rootElementName = "files";
  protected static prefixURI = "projects/{!:project_id}/files/{:id}";
  protected static elementClass = File;

  protected static secondaryElementNameSingular = "process";
  protected static secondaryElementClass = QueuedProcess;

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
