import { BaseCollection } from "../collections/base_collection.js";
import type { HttpMethod } from "../types/http_method.js";

export abstract class OtaCollection<
	ElementType,
	SecondaryType = ElementType,
> extends BaseCollection<ElementType, SecondaryType> {
	protected override doDelete<
		T = Record<string, unknown> | Record<string, unknown>[],
	>(id: string | number, req_params: Record<string, unknown>): Promise<T> {
		const params = { ...req_params, id };
		return this.createPromise(
			"DELETE",
			params,
			this.returnJSONFromData,
			null,
		) as Promise<T>;
	}

	protected returnJSONFromData(
		json: Record<string, unknown>,
	): Record<string, unknown> | Array<Record<string, unknown>> {
		const data = json.data;

		if (
			data &&
			typeof data === "object" &&
			(!Array.isArray(data) ||
				data.every((item) => typeof item === "object" && item !== null))
		) {
			return data as Record<string, unknown> | Array<Record<string, unknown>>;
		}

		throw new Error(
			"Invalid response format: expected object or array of objects in `data`",
		);
	}

	protected async createVoidPromise(
		method: HttpMethod,
		params: Record<string, unknown>,
		body: object | object[] | null,
		uri: string | null = null,
	): Promise<null> {
		await this.prepareRequest(method, body, params, uri);
		return null;
	}
}
