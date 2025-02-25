import type { BulkResult } from "../interfaces/bulk_result.js";
import type { CursorPaginatedResult } from "../interfaces/cursor_paginated_result.js";
import type { Keyable } from "../interfaces/keyable.js";
import { Key } from "../models/key.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type {
	BulkUpdateKeyParams,
	CreateKeyParams,
	GetKeyParams,
	KeyDeleted,
	KeyParamsWithPagination,
	KeysBulkDeleted,
	UpdateKeyData,
} from "../types/keys.js";
import { BaseCollection } from "./base_collection.js";

export class Keys extends BaseCollection<Key> {
	protected static override prefixURI = "projects/{!:project_id}/keys/{:id}";

	protected get elementClass(): new (
		json: Keyable,
	) => Key {
		return Key;
	}

	protected override get rootElementName(): string {
		return "keys";
	}

	protected override get rootElementNameSingular(): string | null {
		return "key";
	}

	list(
		request_params: KeyParamsWithPagination,
	): Promise<CursorPaginatedResult<Key>> {
		return this.doListCursor(request_params);
	}

	create(
		key_params: CreateKeyParams,
		request_params: ProjectOnly,
	): Promise<BulkResult<Key>> {
		return this.createPromise(
			"POST",
			request_params,
			this.populateArrayFromJsonBulk,
			key_params,
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
			this.returnBareJSON<KeysBulkDeleted>,
			keys,
			"projects/{!:project_id}/keys",
		);
	}
}
