"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const base_collection_1 = require("./base_collection");
const file_1 = require("../models/file");
const queued_process_1 = require("../models/queued_process");
let Files = /** @class */ (() => {
    class Files extends base_collection_1.BaseCollection {
        upload(project_id, upload) {
            return this.createPromise('POST', { project_id: project_id }, this.choosePopulator(upload), this.handleReject, upload, 'projects/{!:project_id}/files/upload');
        }
        download(project_id, download) {
            return this.createPromise('POST', { project_id: project_id }, this.returnBareJSON, this.handleReject, download, 'projects/{!:project_id}/files/download');
        }
        choosePopulator(uploadParams) {
            // Temporary solution for backwards compatibility with sync file uploading
            // Sync uploading will be removed by summer 2020
            if (uploadParams.queue) {
                return this.populateSecondaryObjectFromJsonRoot;
            }
            else {
                return this.returnBareJSON;
            }
        }
    }
    Files.rootElementName = 'files';
    Files.prefixURI = 'projects/{!:project_id}/files/{:id}';
    Files.elementClass = file_1.File;
    Files.secondaryElementNameSingular = 'process';
    Files.secondaryElementClass = queued_process_1.QueuedProcess;
    return Files;
})();
exports.Files = Files;
//# sourceMappingURL=files.js.map