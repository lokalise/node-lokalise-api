"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base_model");
class Languages extends base_model_1.BaseModel {
    system_languages() {
        this.createPromise('GET', {}, this.populateArrayFromJson, this.handleReject, null, 'system/languages');
    }
}
Languages.rootElementName = 'projects';
Languages.prefixURI = 'projects/{!:project_id}/languages/{:id}';
exports.Languages = Languages;
//# sourceMappingURL=languages.js.map