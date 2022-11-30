import { Keyable } from "../interfaces/keyable.js";
export type TranslationData = {
    language_iso?: string;
    translation?: string | Keyable;
    is_reviewed?: boolean;
    is_unverified?: boolean;
    custom_translation_status_ids?: string[] | number[];
};
