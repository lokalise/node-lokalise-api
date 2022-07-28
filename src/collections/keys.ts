import { BaseCollection } from "./base_collection";
import { Key } from "../models/key";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";
import { PaginatedResult } from "../interfaces/paginated_result";
import { ProjectOnly } from "../interfaces/project_only";
import { CreateKeyData } from "../types/create_key_data";
import { UpdateKeyData } from "../types/update_key_data";
import { BulkResult } from "../interfaces/bulk_result";

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
  protected static rootElementName: string = "keys";
  protected static rootElementNameSingular: string = "key";
  protected static prefixURI: string = "projects/{!:project_id}/keys/{:id}";
  protected static elementClass: object = Key;

  list(request_params: ParamsWithPagination): Promise<PaginatedResult<Key>> {
    return super.doList(request_params);
  }

  create(
    key_params: CreateKeyParams,
    params: ProjectOnly
  ): Promise<BulkResult<Key>> {
    return this.createPromise(
      "POST",
      params,
      this.populateArrayFromJsonBulk,
      this.handleReject,
      key_params
    );
  }

  get(key_id: string | number, request_params: GetKeyParams): Promise<Key> {
    return super.doGet(key_id, request_params);
  }

  update(
    key_id: string | number,
    key_params: UpdateKeyData,
    request_params: ProjectOnly
  ): Promise<Key> {
    const params = {
      ...request_params,
      ...{ id: key_id },
    };
    return this.createPromise(
      "PUT",
      params,
      this.populateObjectFromJsonRoot,
      this.handleReject,
      key_params
    );
  }

  delete(
    key_id: string | number,
    request_params: ProjectOnly
  ): Promise<KeyDeleted> {
    return super.doDelete(key_id, request_params);
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
    return this.createPromise(
      "DELETE",
      request_params,
      this.returnBareJSON,
      this.handleReject,
      key_ids,
      "projects/{!:project_id}/keys"
    );
  }
}
