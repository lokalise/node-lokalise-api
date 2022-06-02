"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationProviders = void 0;
const base_collection_1 = require("./base_collection");
const translation_provider_1 = require("../models/translation_provider");
class TranslationProviders extends base_collection_1.BaseCollection {
    static rootElementName = "translation_providers";
    static prefixURI = "teams/{!:team_id}/translation_providers/{:id}";
    static elementClass = translation_provider_1.TranslationProvider;
}
exports.TranslationProviders = TranslationProviders;
//# sourceMappingURL=translation_providers.js.map