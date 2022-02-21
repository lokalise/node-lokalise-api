import { BaseCollection } from "./base_collection";
import { File } from "../models/file";
import { QueuedProcess } from "../models/queued_process";
export class Files extends BaseCollection {
    upload(project_id, upload) {
        return this.createPromise("POST", { project_id: project_id }, this.populateSecondaryObjectFromJsonRoot, this.handleReject, upload, "projects/{!:project_id}/files/upload");
    }
    download(project_id, download) {
        return this.createPromise("POST", { project_id: project_id }, this.returnBareJSON, this.handleReject, download, "projects/{!:project_id}/files/download");
    }
}
Files.rootElementName = "files";
Files.prefixURI = "projects/{!:project_id}/files/{:id}";
Files.elementClass = File;
Files.secondaryElementNameSingular = "process";
Files.secondaryElementClass = QueuedProcess;
//# sourceMappingURL=files.js.map