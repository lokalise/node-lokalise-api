"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translations = void 0;
const base_collection_1 = require("./base_collection");
const translation_1 = require("../models/translation");
let Translations = /** @class */ (() => {
    class Translations extends base_collection_1.BaseCollection {
        update(id, body, params = {}) {
            params["id"] = id;
            return this.createPromise("PUT", params, this.populateObjectFromJsonRoot, this.handleReject, body);
        }
    }
    Translations.rootElementName = "translations";
    Translations.rootElementNameSingular = "translation";
    Translations.prefixURI = "projects/{!:project_id}/translations/{:id}";
    Translations.elementClass = translation_1.Translation;
    return Translations;
})();
exports.Translations = Translations;
//# sourceMappingURL=translations.js.map