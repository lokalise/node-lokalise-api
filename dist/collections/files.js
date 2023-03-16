import { BaseCollection } from "./base_collection.js";
import { File } from "../models/file.js";
import { QueuedProcess } from "../models/queued_process.js";
class Files extends BaseCollection {
    static rootElementName = "files";
    static prefixURI = "projects/{!:project_id}/files/{:id}";
    static elementClass = File;
    static secondaryElementNameSingular = "process";
    static secondaryElementClass = QueuedProcess;
    list(request_params) {
        return this.doList(request_params);
    }
    upload(project_id, upload) {
        return this.createPromise("POST", { project_id: project_id }, this.populateSecondaryObjectFromJsonRoot, this.handleReject, upload, "projects/{!:project_id}/files/upload");
    }
    download(project_id, download) {
        return this.createPromise("POST", { project_id: project_id }, this.returnBareJSON, this.handleReject, download, "projects/{!:project_id}/files/download");
    }
    delete(file_id, request_params) {
        return this.doDelete(file_id, request_params);
    }
}
export { Files };
//# sourceMappingURL=files.js.map