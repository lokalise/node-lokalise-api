import { BaseCollection } from "./base_collection.js";
import { TranslationProvider } from "../models/translation_provider.js";

export class TranslationProviders extends BaseCollection {
  protected static rootElementName = "translation_providers";
  protected static prefixURI = "teams/{!:team_id}/translation_providers/{:id}";
  protected static elementClass = TranslationProvider;
}
