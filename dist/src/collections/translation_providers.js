import { BaseCollection } from "./base_collection";
import { TranslationProvider } from "../models/translation_provider";
export class TranslationProviders extends BaseCollection {
}
TranslationProviders.rootElementName = "translation_providers";
TranslationProviders.prefixURI = "teams/{!:team_id}/translation_providers/{:id}";
TranslationProviders.elementClass = TranslationProvider;
//# sourceMappingURL=translation_providers.js.map