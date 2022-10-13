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

export class Keys extends BaseCollection {
  protected static rootElementName = "keys";
  protected static rootElementNameSingular = "key";
  protected static prefixURI = "projects/{!:project_id}/keys/{:id}";
  protected static elementClass = Key;

  list(request_params: KeyParamsWithPagination): Promise<PaginatedResult<Key>> {
    return this.doList(request_params);
  }

  create(
    key_params: CreateKeyParams,
    request_params: ProjectOnly
  ): Promise<BulkResult<Key>> {
    return this.doCreate(
      key_params,
      request_params,
      this.populateArrayFromJsonBulk
    );
  }

  get(key_id: string | number, request_params: GetKeyParams): Promise<Key> {
    return this.doGet(key_id, request_params);
  }

  update(
    key_id: string | number,
    key_params: UpdateKeyData,
    request_params: ProjectOnly
  ): Promise<Key> {
    return this.doUpdate(key_id, key_params, request_params);
  }

  delete(
    key_id: string | number,
    request_params: ProjectOnly
  ): Promise<KeyDeleted> {
    return this.doDelete(key_id, request_params);
  }

  bulk_update(
    key_params: BulkUpdateKeyParams,
    request_params: ProjectOnly
  ): Promise<BulkResult<Key>> {
    return this.createPromise(
      "PUT",
      request_params,
      this.populateArrayFromJsonBulk,
      this.handleReject,
      key_params,
      "projects/{!:project_id}/keys"
    );
  }

  bulk_delete(
    key_ids: number[] | string[],
    request_params: ProjectOnly
  ): Promise<KeysBulkDeleted> {
    const keys = { keys: this.objToArray(key_ids) };

    return this.createPromise(
      "DELETE",
      request_params,
      this.returnBareJSON,
      this.handleReject,
      keys,
      "projects/{!:project_id}/keys"
    );
  }
}
