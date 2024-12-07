import { BaseCollection } from "../../src/collections/base_collection";
import type { Keyable } from "../../src/interfaces/keyable.js";
import { Branch } from "../../src/models/branch.js";

export class DummyCollection extends BaseCollection<Branch> {
	protected get elementClass(): new (
		json: Keyable,
	) => Branch {
		return Branch;
	}

	public testGetUri(uri: string | null): string {
		return this.getUri(uri);
	}
}