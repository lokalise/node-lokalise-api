import { BaseCollection } from "./base_collection.js";
import { TranslationProvider } from "../models/translation_provider.js";
export class TranslationProviders extends BaseCollection {
    static rootElementName = "translation_providers";
    static prefixURI = "teams/{!:team_id}/translation_providers/{:id}";
    static elementClass = TranslationProvider;
}
//# sourceMappingURL=translation_providers.js.map