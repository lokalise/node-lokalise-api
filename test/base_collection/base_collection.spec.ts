import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";
import { DummyCollection } from "./dummy_collection.js";

describe("BaseCollection", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const collection = new DummyCollection(lokaliseApi.clientData);

	it("should throw error if rootElementName is not defined", () => {
		expect(() => collection.rootElementName).toThrowError(
			"Root element name is not defined for this collection",
		);
	});

	it("should throw error if rootElementNameSingular is not defined", () => {
		expect(() => collection.rootElementNameSingular).toThrowError(
			"Root element name singular is not defined for this collection",
		);
	});

	it("should throw error if secondaryElementClass is not defined", () => {
		expect(() => collection.secondaryElementClass).toThrowError(
			"Secondary elements are not supported by this collection",
		);
	});

	it("should throw error if secondaryElementNameSingular is not defined", () => {
		expect(() => collection.secondaryElementNameSingular).toThrowError(
			"Secondary element name singular is not defined for this collection",
		);
	});

	it("should throw error if ", () => {
		expect(() => collection.testGetUri(null)).toThrowError(
			"No URI or prefixURI provided.",
		);
	});
});
