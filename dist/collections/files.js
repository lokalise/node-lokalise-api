"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const file_1 = require("../models/file");
class Files extends base_collection_1.BaseCollection {
    upload(project_id, upload) {
        return this.createPromise('POST', { project_id: project_id }, this.returnBareJSON, this.handleReject, upload, 'projects/{!:project_id}/files/upload');
    }
    download(project_id, download) {
        return this.createPromise('POST', { project_id: project_id }, this.returnBareJSON, this.handleReject, download, 'projects/{!:project_id}/files/download');
    }
}
Files.rootElementName = 'files';
Files.prefixURI = 'projects/{!:project_id}/files/{:id}';
Files.elementClass = file_1.File;
exports.Files = Files;
//# sourceMappingURL=files.js.map