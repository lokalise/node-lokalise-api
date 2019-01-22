"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base_model");
class Keys extends base_model_1.BaseModel {
    bulk_update(project_id, keys) {
        this.createPromise('PUT', { project_id: project_id }, this.returnBareJSON, this.returnBareJSON, keys, 'projects/{!:project_id}/keys');
    }
}
Keys.rootElementName = 'keys';
Keys.prefixURI = 'projects/{!:project_id}/keys/{:id}';
exports.Keys = Keys;
//# sourceMappingURL=keys.js.map