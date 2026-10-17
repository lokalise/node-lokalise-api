import { CursorPaginatedResultV1 } from "../models/v1/cursor_paginated_result.js";
import { isRecord } from "../utils/type_guards.js";
import { BaseCollection } from "./base_collection.js";

export abstract class BaseCollectionV1<
	ElementType,
	SecondaryType = ElementType,
> extends BaseCollection<ElementType, SecondaryType> {
	protected doListCursorV1(
		params: Record<string, unknown>,
	): Promise<CursorPaginatedResultV1<ElementType>> {
		return this.createPromise<CursorPaginatedResultV1<ElementType>>(
			"GET",
			params,
			this.populateArrayFromJsonCursorV1,
			null,
		);
	}

	protected populateArrayFromJsonCursorV1(
		json: Record<string, unknown>,
		headers: Headers,
	): CursorPaginatedResultV1<ElementType> {
		const data = json.data;

		if (!Array.isArray(data)) {
			throw new Error(
				`Expected 'data' to be an array for cursor pagination but received: ${typeof data}`,
			);
		}

		const nextCursor =
			typeof json.next_cursor === "string" ? json.next_cursor : null;

		const hasMore = typeof json.has_more === "boolean" ? json.has_more : false;

		const items = data.map((obj, index) => {
			if (!isRecord(obj)) {
				throw new Error(
					`Expected item at index ${index} in 'data' to be an object`,
				);
			}

			return this.populateObjectFromJson(obj, headers) as ElementType;
		});

		return new CursorPaginatedResultV1({
			data: items,
			next_cursor: nextCursor,
			has_more: hasMore,
		});
	}
}
