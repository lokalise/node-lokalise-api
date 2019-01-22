"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base_model");
class Files extends base_model_1.BaseModel {
    list(params = {}) {
        return super.list(params);
    }
    upload(project_id, upload) {
        return this.createPromise('POST', { project_id: project_id }, this.returnBareJSON, this.handleReject, upload, 'projects/{!:project_id}/files/upload');
    }
    download(download) {
        return this.createPromise('POST', { id: 'upload' }, this.returnBareJSON, this.handleReject, download, 'projects/{!:project_id}/files/download');
    }
}
Files.rootElementName = 'files';
Files.prefixURI = 'projects/{!:project_id}/files/{:id}';
exports.Files = Files;
//# sourceMappingURL=files.js.map