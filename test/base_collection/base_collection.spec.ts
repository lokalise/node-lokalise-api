import { getTestApiKey } from "../helpers/get_env.js";
import { describe, expect, it, LokaliseApi, Stub } from "../setup.js";

import {
	DummyCollection,
	DummyCollectionWithRoot,
} from "./dummy_collection.js";

describe("BaseCollection", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: getTestApiKey() });

	const collection = new DummyCollection(lokaliseApi.clientData);
	const collectionWithRoot = new DummyCollectionWithRoot(
		lokaliseApi.clientData,
	);

	it("should throw error if rootElementName is not defined", () => {
		expect(() => collection.testRootElementName()).toThrow(
			"rootElementName is not defined. Subclasses must override `rootElementName`.",
		);
	});

	it("should throw error if rootElementNameSingular is not defined", () => {
		expect(() => collection.testRootElementNameSingular()).toThrow(
			"rootElementNameSingular is not defined. Subclasses must override `rootElementNameSingular`.",
		);
	});

	it("should throw error if secondaryElementClass is not defined", () => {
		expect(() => collection.testSecondaryElementClass()).toThrow(
			"Secondary elements are not supported by this collection",
		);
	});

	it("should throw error if secondaryElementNameSingular is not defined", () => {
		expect(() => collection.testSecondaryElementNameSingular()).toThrow(
			"secondaryElementNameSingular is not defined. Subclasses must override this if secondary elements are used.",
		);
	});

	it("should throw if JSON response body is missing", async () => {
		const uri = "test/no-content";

		const stub = new Stub({
			uri,
			status: 204,
		});

		await stub.setStub();

		await expect(collection.testCreatePromise(uri)).rejects.toThrow(
			"Expected JSON response body, but received no content.",
		);
	});

	it("should throw error if no URI or prefixURI is provided", () => {
		expect(() => collection.testGetUri(null)).toThrow(
			"No URI or prefixURI provided.",
		);
	});

	it("should reject non-object items in arrays", () => {
		expect(() =>
			collectionWithRoot.testPopulateArray({
				items: [null],
			}),
		).toThrow("Expected item at index 0 in 'items' to be an object");
	});

	it("should reject non-object items in bulk arrays", () => {
		expect(() =>
			collectionWithRoot.testPopulateArrayFromJsonBulk({
				items: [42],
			}),
		).toThrow("Expected item at index 0 in 'items' to be an object");
	});

	it("should reject non-object items in cursor arrays", () => {
		expect(() =>
			collectionWithRoot.testPopulateArrayFromJsonCursor({
				items: [[]],
			}),
		).toThrow("Expected item at index 0 in 'items' to be an object");
	});
});
