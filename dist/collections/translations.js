"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_collection_1 = require("./base_collection");
const translation_1 = require("../models/translation");
class Translations extends base_collection_1.BaseCollection {
}
Translations.rootElementName = 'translations';
Translations.prefixURI = 'projects/{!:project_id}/translations/{:id}';
Translations.elementClass = translation_1.Translation;
exports.Translations = Translations;
//# sourceMappingURL=translations.js.map