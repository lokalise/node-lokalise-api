"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const base_collection_1 = require("./base_collection");
const file_1 = require("../models/file");
const queued_process_1 = require("../models/queued_process");
class Files extends base_collection_1.BaseCollection {
    static rootElementName = "files";
    static prefixURI = "projects/{!:project_id}/files/{:id}";
    static elementClass = file_1.File;
    static secondaryElementNameSingular = "process";
    static secondaryElementClass = queued_process_1.QueuedProcess;
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
exports.Files = Files;
//# sourceMappingURL=files.js.map