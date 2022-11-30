import { BaseCollection } from "./base_collection.js";
import { Key } from "../models/key.js";
import { KeyParamsWithPagination } from "../interfaces/key_params_with_pagination.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { CreateKeyParams } from "../types/create_key_params.js";
import { UpdateKeyData } from "../types/update_key_data.js";
import { BulkUpdateKeyParams } from "../types/bulk_update_key_params.js";
import { BulkResult } from "../interfaces/bulk_result.js";
import { GetKeyParams } from "../interfaces/get_key_params.js";
type KeyDeleted = {
    project_id: string;
    key_removed: boolean;
    keys_locked?: number;
};
type KeysBulkDeleted = {
    project_id: string;
    keys_removed: boolean;
    keys_locked: number;
};
export declare class Keys extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Key;
    list(request_params: KeyParamsWithPagination): Promise<PaginatedResult<Key>>;
    create(key_params: CreateKeyParams, request_params: ProjectOnly): Promise<BulkResult<Key>>;
    get(key_id: string | number, request_params: GetKeyParams): Promise<Key>;
    update(key_id: string | number, key_params: UpdateKeyData, request_params: ProjectOnly): Promise<Key>;
    delete(key_id: string | number, request_params: ProjectOnly): Promise<KeyDeleted>;
    bulk_update(key_params: BulkUpdateKeyParams, request_params: ProjectOnly): Promise<BulkResult<Key>>;
    bulk_delete(key_ids: number[] | string[], request_params: ProjectOnly): Promise<KeysBulkDeleted>;
}
export {};
