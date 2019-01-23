"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const key_1 = require("../models/key");
class Keys extends base_collection_1.BaseCollection {
    bulk_update(project_id, keys) {
        this.createPromise('PUT', { project_id: project_id }, this.returnBareJSON, this.returnBareJSON, keys, 'projects/{!:project_id}/keys');
    }
}
Keys.rootElementName = 'keys';
Keys.prefixURI = 'projects/{!:project_id}/keys/{:id}';
Keys.elementClass = key_1.Key;
exports.Keys = Keys;
//# sourceMappingURL=keys.js.map