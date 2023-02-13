import type { SupportedPlatforms } from "../types/supported_platforms.js";
export type CreateProjectKeyInput = {
    key_name: string;
    description?: string;
    platforms: Array<SupportedPlatforms>;
    filenames?: {
        [key: string]: string;
    };
    tags?: Array<string>;
    translations?: Array<{
        language_iso: string;
        translation: string;
        is_reviewed?: boolean;
        is_unverified?: boolean;
        custom_translation_status_ids?: Array<string>;
    }>;
    is_plural?: boolean;
    plural_name?: string;
    is_hidden?: boolean;
    is_archived?: boolean;
    context?: string;
    char_limit?: number;
};
