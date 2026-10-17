import { ApiErrorVantage } from "../../../src/models/vantage/api_error.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub } from "../../setup.js";

describe("ApiErrorVantage", () => {
	it("creates an error without details", () => {
		const error = new ApiErrorVantage(
			"Resource not found",
			"resource_not_found",
		);

		expect(error).toBeInstanceOf(Error);
		expect(error).toBeInstanceOf(ApiErrorVantage);
		expect(error.name).toBe("ApiErrorVantage");
		expect(error.message).toBe("Resource not found");
		expect(error.code).toBe("resource_not_found");
		expect(error.details).toBeUndefined();
	});

	it("converts an error without details to a string", () => {
		const error = new ApiErrorVantage(
			"Resource not found",
			"resource_not_found",
		);

		expect(error.toString()).toBe(
			"ApiErrorVantage: Resource not found (Code: resource_not_found)",
		);
	});

	it("converts an error with details to a string", () => {
		const error = new ApiErrorVantage("Invalid request", "validation_error", {
			field: "name",
			reason: "required",
			count: 2,
		});

		expect(error.details).toEqual({
			field: "name",
			reason: "required",
			count: 2,
		});

		expect(error.toString()).toBe(
			'ApiErrorVantage: Invalid request (Code: validation_error) | Details: {"field":"name","reason":"required","count":2}',
		);
	});

	it("handles empty details", () => {
		const error = new ApiErrorVantage("Invalid request", "invalid_request", {});

		expect(error.details).toEqual({});
		expect(error.toString()).toBe(
			"ApiErrorVantage: Invalid request (Code: invalid_request) | Details: {}",
		);
	});
});

describe("Vantage API errors", () => {
	const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";
	const uri = `projects/${project_id}/items`;
	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	it("handles a single error without details", async () => {
		const stub = new Stub({
			fixture: "vantage/errors/not_found.json",
			uri,
			version: "vantage/v1",
			status: 404,
		});
		await stub.setStub();

		const request = lokaliseVantageApi.projectItems().list({ project_id });
		await expect(request).rejects.toBeInstanceOf(ApiErrorVantage);
		await expect(request).rejects.toMatchObject({
			name: "ApiErrorVantage",
			message: "The requested resource was not found.",
			code: "resource_not_found",
		});
	});

	it("handles a single error with details", async () => {
		const stub = new Stub({
			fixture: "vantage/errors/invalid_request.json",
			uri,
			version: "vantage/v1",
			status: 400,
		});
		await stub.setStub();

		const request = lokaliseVantageApi.projectItems().list({ project_id });
		await expect(request).rejects.toBeInstanceOf(ApiErrorVantage);
		await expect(request).rejects.toMatchObject({
			message: "The request could not be processed.",
			code: "invalid_request",
			details: { field: "projectId" },
		});
	});

	it("handles multiple validation errors", async () => {
		const stub = new Stub({
			fixture: "vantage/errors/validation_errors.json",
			uri,
			version: "vantage/v1",
			status: 422,
		});
		await stub.setStub();

		const request = lokaliseVantageApi.projectItems().list({ project_id });
		await expect(request).rejects.toBeInstanceOf(AggregateError);
		await expect(request).rejects.toMatchObject({
			errors: [
				{
					name: "ApiErrorVantage",
					message: "Invalid value.",
					code: "validation_error",
					details: { field: "name" },
				},
				{
					name: "ApiErrorVantage",
					message: "Invalid value.",
					code: "validation_error",
					details: { field: "language" },
				},
			],
		});
	});

	it("falls back when the error response has an unexpected format", async () => {
		const stub = new Stub({
			fixture: "vantage/errors/unexpected.json",
			uri,
			version: "vantage/v1",
			status: 503,
		});
		await stub.setStub();

		const request = lokaliseVantageApi.projectItems().list({ project_id });
		await expect(request).rejects.toBeInstanceOf(ApiErrorVantage);
		await expect(request).rejects.toMatchObject({
			message: "An unknown error occurred",
			code: "unknown_error",
			details: {
				status: 503,
				reason: "unexpected response format",
			},
		});
	});

	it("handles an array containing invalid error entries", async () => {
		const stub = new Stub({
			fixture: "vantage/errors/invalid_entries.json",
			uri,
			version: "vantage/v1",
			status: 422,
		});

		await stub.setStub();

		const request = lokaliseVantageApi.projectItems().list({ project_id });

		await expect(request).rejects.toBeInstanceOf(ApiErrorVantage);
		await expect(request).rejects.toMatchObject({
			message: "An unknown error occurred",
			code: "unknown_error",
			details: {
				status: 422,
				reason: "unexpected response format",
			},
		});
	});

	it("handles an unexpected root-level array", async () => {
		const stub = new Stub({
			fixture: "vantage/errors/root_array.json",
			uri,
			version: "vantage/v1",
			status: 500,
		});

		await stub.setStub();

		const request = lokaliseVantageApi.projectItems().list({ project_id });

		await expect(request).rejects.toBeInstanceOf(ApiErrorVantage);
		await expect(request).rejects.toMatchObject({
			message: "An unknown error occurred",
			code: "unknown_error",
			details: {
				status: 500,
				reason: "unexpected response format",
			},
		});
	});
});
