import { BaseCollection } from "./base_collection.js";
import { Key } from "../models/key.js";
import { CursorPaginatedResult } from "../interfaces/cursor_paginated_result.js";
import { BulkResult } from "../interfaces/bulk_result.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type {
  CreateKeyParams,
  UpdateKeyData,
  BulkUpdateKeyParams,
  KeyDeleted,
  KeysBulkDeleted,
  KeyParamsWithPagination,
  GetKeyParams,
} from "../types/keys.js";

export class Keys extends BaseCollection {
  protected static rootElementName = "keys";
  protected static rootElementNameSingular = "key";
  protected static prefixURI = "projects/{!:project_id}/keys/{:id}";
  protected static elementClass = Key;

  list(
    request_params: KeyParamsWithPagination,
  ): Promise<CursorPaginatedResult<Key>> {
    return this.doListCursor(request_params);
  }

  create(
    key_params: CreateKeyParams,
    request_params: ProjectOnly,
  ): Promise<BulkResult<Key>> {
    return this.doCreate(
      key_params,
      request_params,
      this.populateArrayFromJsonBulk,
    );
  }

  get(key_id: string | number, request_params: GetKeyParams): Promise<Key> {
    return this.doGet(key_id, request_params);
  }

  update(
    key_id: string | number,
    key_params: UpdateKeyData,
    request_params: ProjectOnly,
  ): Promise<Key> {
    return this.doUpdate(key_id, key_params, request_params);
  }

  delete(
    key_id: string | number,
    request_params: ProjectOnly,
  ): Promise<KeyDeleted> {
    return this.doDelete(key_id, request_params);
  }

  bulk_update(
    key_params: BulkUpdateKeyParams,
    request_params: ProjectOnly,
  ): Promise<BulkResult<Key>> {
    return this.createPromise(
      "PUT",
      request_params,
      this.populateArrayFromJsonBulk,
      this.handleReject,
      key_params,
      "projects/{!:project_id}/keys",
    );
  }

  bulk_delete(
    key_ids: number[] | string[],
    request_params: ProjectOnly,
  ): Promise<KeysBulkDeleted> {
    const keys = { keys: this.objToArray(key_ids) };

    return this.createPromise(
      "DELETE",
      request_params,
      this.returnBareJSON,
      this.handleReject,
      keys,
      "projects/{!:project_id}/keys",
    );
  }
}
