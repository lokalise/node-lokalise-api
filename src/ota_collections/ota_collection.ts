import { BaseCollection } from "../collections/base_collection.js";
import type { Keyable } from "../interfaces/keyable.js";
import type { HttpMethod } from "../types/http_method.js";

export abstract class OtaCollection<
	ElementType,
	SecondaryType = ElementType,
> extends BaseCollection<ElementType, SecondaryType> {
	protected doDelete<T = Keyable | Keyable[]>(
		id: string | number,
		req_params: Keyable,
	): Promise<T> {
		const params = { ...req_params, id };
		return this.createPromise(
			"DELETE",
			params,
			this.returnJSONFromData,
			null,
		) as Promise<T>;
	}

	protected returnJSONFromData(json: Keyable): Keyable | Array<Keyable> {
		return json.data;
	}

	protected async createVoidPromise(
		method: HttpMethod,
		params: Keyable,
		body: object | object[] | null,
		uri: string | null = null,
	): Promise<null> {
		await this.prepareRequest(method, body, params, uri);
		return null;
	}
}
