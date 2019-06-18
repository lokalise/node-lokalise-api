import { BaseCollection } from './base_collection';
import { TranslationProvider } from '../models/translation_provider';

export class TranslationProviders extends BaseCollection {
  protected static rootElementName:string = 'translation_providers';
  protected static prefixURI:string = 'teams/{!:team_id}/translation_providers/{:id}';
  protected static elementClass: Object = TranslationProvider;
}
