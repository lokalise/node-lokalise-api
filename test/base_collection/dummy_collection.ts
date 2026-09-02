import { BaseCollection } from "../../src/collections/base_collection.js";
import type { BulkResult } from "../../src/interfaces/bulk_result.js";
import { Branch } from "../../src/models/branch.js";
import type { CursorPaginatedResult } from "../../src/models/cursor_paginated_result.js";

export class DummyCollection extends BaseCollection<Branch> {
	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => Branch {
		return Branch;
	}

	public testGetUri(uri: string | null): string {
		return this.getUri(uri);
	}

	public testRootElementName(): string {
		return this.rootElementName;
	}

	public testRootElementNameSingular(): string | null {
		return this.rootElementNameSingular;
	}

	public testSecondaryElementClass(): new (
		json: Record<string, unknown>,
	) => Branch {
		return this.secondaryElementClass;
	}

	public testSecondaryElementNameSingular(): string {
		return this.secondaryElementNameSingular;
	}

	public testCreatePromise(uri: string): Promise<Branch> {
		return this.createPromise(
			"GET",
			{},
			this.populateObjectFromJson,
			null,
			uri,
		);
	}
}

export class DummyCollectionWithRoot extends DummyCollection {
	protected override get rootElementName(): string {
		return "items";
	}

	public testPopulateArray(
		json: Record<string, unknown>,
		headers = new Headers(),
	): Branch[] {
		return this.populateArray(json, headers);
	}

	public testPopulateArrayFromJsonBulk(
		json: Record<string, unknown>,
		headers = new Headers(),
	): BulkResult<Branch> {
		return this.populateArrayFromJsonBulk(json, headers);
	}

	public testPopulateArrayFromJsonCursor(
		json: Record<string, unknown>,
		headers = new Headers(),
	): CursorPaginatedResult<Branch> {
		return this.populateArrayFromJsonCursor(json, headers);
	}
}
