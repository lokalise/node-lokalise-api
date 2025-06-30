import { describe, expect, it, LokaliseApi } from "../setup.js";
import { DummyCollection } from "./dummy_collection.js";

describe("BaseCollection", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const collection = new DummyCollection(lokaliseApi.clientData);

	it("should throw error if rootElementName is not defined", () => {
		expect(() => collection.testRootElementName()).toThrowError(
			"rootElementName is not defined. Subclasses must override `rootElementName`.",
		);
	});

	it("should throw error if rootElementNameSingular is not defined", () => {
		expect(() => collection.testRootElementNameSingular()).toThrowError(
			"rootElementNameSingular is not defined. Subclasses must override `rootElementNameSingular`.",
		);
	});

	it("should throw error if secondaryElementClass is not defined", () => {
		expect(() => collection.testSecondaryElementClass()).toThrowError(
			"Secondary elements are not supported by this collection",
		);
	});

	it("should throw error if secondaryElementNameSingular is not defined", () => {
		expect(() => collection.testSecondaryElementNameSingular()).toThrowError(
			"secondaryElementNameSingular is not defined. Subclasses must override this if secondary elements are used.",
		);
	});

	it("should throw error if ", () => {
		expect(() => collection.testGetUri(null)).toThrowError(
			"No URI or prefixURI provided.",
		);
	});
});
