import { BaseCollection } from "./base_collection.js";
import { Translation } from "../models/translation.js";
import { CursorPaginatedResult } from "../interfaces/cursor_paginated_result.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type { UpdateTranslationParams, ListTranslationParams, GetTranslationParams } from "../types/translations.js";
export declare class Translations extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Translation;
    list(request_params: ListTranslationParams): Promise<CursorPaginatedResult<Translation>>;
    get(translation_id: string | number, request_params: GetTranslationParams): Promise<Translation>;
    update(translation_id: string | number, translation_params: UpdateTranslationParams, request_params: ProjectOnly): Promise<Translation>;
}
