import { BaseCollection } from "./base_collection.js";
import { Key } from "../models/key.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { CreateKeyData } from "../types/create_key_data.js";
import { UpdateKeyData } from "../types/update_key_data.js";
import { BulkResult } from "../interfaces/bulk_result.js";

interface ParamsWithPagination extends ProjectWithPagination {
  disable_references?: number;
  include_comments?: number;
  include_screenshots?: number;
  include_translations?: number;
  filter_translation_lang_ids?: string;
  filter_tags?: string;
  filter_filenames?: string;
  filter_keys?: string;
  filter_key_ids?: string;
  filter_platforms?: string;
  filter_untranslated?: number;
  filter_qa_issues?: string;
  filter_archived?: string;
}

interface GetKeyParams extends ProjectOnly {
  disable_references?: number;
}

type CreateKeyParams = {
  keys?: CreateKeyData[];
  use_automations?: boolean;
};

export type UpdateKeyDataWithId = UpdateKeyData & {
  key_id: string | number;
};

export type BulkUpdateKeyParams = {
  keys?: UpdateKeyDataWithId[];
  use_automations?: boolean;
};

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

  list(request_params: ParamsWithPagination): Promise<PaginatedResult<Key>> {
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
