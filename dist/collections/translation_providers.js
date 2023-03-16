import { BaseCollection } from "./base_collection.js";
import { TranslationProvider } from "../models/translation_provider.js";
class TranslationProviders extends BaseCollection {
    static rootElementName = "translation_providers";
    static prefixURI = "teams/{!:team_id}/translation_providers/{:id}";
    static elementClass = TranslationProvider;
    list(request_params) {
        return this.doList(request_params);
    }
    get(provider_id, request_params) {
        return this.doGet(provider_id, request_params);
    }
}
export { TranslationProviders };
//# sourceMappingURL=translation_providers.js.map