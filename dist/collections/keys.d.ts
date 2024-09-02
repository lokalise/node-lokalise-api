import type { BulkResult } from "../interfaces/bulk_result.js";
import type { CursorPaginatedResult } from "../interfaces/cursor_paginated_result.js";
import { Key } from "../models/key.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type { BulkUpdateKeyParams, CreateKeyParams, GetKeyParams, KeyDeleted, KeyParamsWithPagination, KeysBulkDeleted, UpdateKeyData } from "../types/keys.js";
import { BaseCollection } from "./base_collection.js";
export declare class Keys extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Key;
    list(request_params: KeyParamsWithPagination): Promise<CursorPaginatedResult<Key>>;
    create(key_params: CreateKeyParams, request_params: ProjectOnly): Promise<BulkResult<Key>>;
    get(key_id: string | number, request_params: GetKeyParams): Promise<Key>;
    update(key_id: string | number, key_params: UpdateKeyData, request_params: ProjectOnly): Promise<Key>;
    delete(key_id: string | number, request_params: ProjectOnly): Promise<KeyDeleted>;
    bulk_update(key_params: BulkUpdateKeyParams, request_params: ProjectOnly): Promise<BulkResult<Key>>;
    bulk_delete(key_ids: number[] | string[], request_params: ProjectOnly): Promise<KeysBulkDeleted>;
}
