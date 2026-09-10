import { CursorPaginatedResultVantage } from "../models/vantage/cursor_paginated_result.js";
import { isRecord } from "../utils/type_guards.js";
import { BaseCollection } from "./base_collection.js";

export abstract class BaseCollectionVantage<
	ElementType,
	SecondaryType = ElementType,
> extends BaseCollection<ElementType, SecondaryType> {
	protected doListCursorVantage(
		params: Record<string, unknown>,
	): Promise<CursorPaginatedResultVantage<ElementType>> {
		return this.createPromise<CursorPaginatedResultVantage<ElementType>>(
			"GET",
			params,
			this.populateArrayFromJsonCursorVantage,
			null,
		);
	}

	protected populateArrayFromJsonCursorVantage(
		json: Record<string, unknown>,
		headers: Headers,
	): CursorPaginatedResultVantage<ElementType> {
		const data = json.data;

		if (!Array.isArray(data)) {
			throw new Error(
				`Expected 'data' to be an array for cursor pagination but received: ${typeof data}`,
			);
		}

		const meta = json.meta;

		if (!isRecord(meta)) {
			throw new Error(
				`Expected 'meta' to be an object for Vantage cursor pagination but received: ${typeof meta}`,
			);
		}

		const count = typeof meta.count === "number" ? meta.count : 0;
		const cursor = typeof meta.cursor === "string" ? meta.cursor : null;
		const hasMore = typeof meta.hasMore === "boolean" ? meta.hasMore : false;

		const items = data.map((obj, index) => {
			if (!isRecord(obj)) {
				throw new Error(
					`Expected item at index ${index} in 'data' to be an object`,
				);
			}

			return this.populateObjectFromJson(obj, headers) as ElementType;
		});

		return new CursorPaginatedResultVantage({
			data: items,
			meta: {
				count,
				cursor,
				hasMore,
			},
		});
	}
}
