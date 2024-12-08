import type { ProjectWithPagination } from "../../src/main.js";
import { ApiError } from "../../src/main.js";
import { LokaliseApi, Stub, describe, expect, it, vi } from "../setup.js";

describe("Errors", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const project_id = "803826145ba90b42d5d860.46800099";

	it("is expected to reject with when there are too many requests", async () => {
		const stub = new Stub({
			fixture: "errors/error_429.json",
			uri: `projects/${project_id}`,
			status: 429,
		});

		await stub.setStub();

		await expect(lokaliseApi.projects().get(project_id)).rejects.toMatchObject({
			message: "Too many requests",
			code: 429,
			details: { reason: "server error without details" },
		});
	});

	it("is expected to throw when JSON processing failed", async () => {
		const stub = new Stub({
			uri: `projects/${project_id}`,
			status: 200,
		});

		await stub.setStub();

		await expect(lokaliseApi.projects().get(project_id)).rejects.toMatchObject({
			message: "Unexpected end of JSON input",
			code: 200,
			details: {
				statusText: "OK",
				reason: "JSON parsing error",
			},
		});
	});

	it("is expected to handle cases when error codes are not numbers", async () => {
		const stub = new Stub({
			uri: `projects/${project_id}`,
			status: 500,
			fixture: "errors/error_with_malformed_code.json",
		});

		await stub.setStub();

		await expect(lokaliseApi.projects().get(project_id)).rejects.toMatchObject({
			message: "An unknown error occurred",
			code: 500,
			details: {
				reason: "unhandled error format",
				data: {
					code: "invalid",
					message: "Server error",
				},
			},
		});
	});

	it("is expected to handle cases when error is nested and error codes are not numbers", async () => {
		const stub = new Stub({
			uri: `projects/${project_id}`,
			status: 404,
			fixture: "errors/nested_error_with_malformed_code.json",
		});

		await stub.setStub();

		await expect(lokaliseApi.projects().get(project_id)).rejects.toMatchObject({
			message: "Server error",
			code: 500,
			details: {
				reason: "server error without details",
			},
		});
	});

	it("handles exceptions", async () => {
		const fakeProjectId = "803";

		const stub = new Stub({
			uri: `projects/${fakeProjectId}/branches`,
			doFail: true,
		});

		await stub.setStub();

		try {
			await lokaliseApi.branches().list({
				project_id: fakeProjectId,
			});
		} catch (e) {
			expect(e).toBeInstanceOf(ApiError);
			expect(e.message).toBe("fetch failed");
			expect(e.code).toBe(500);
			expect(e.details).toEqual({ reason: "network or fetch error" });
		}
	});

	it("handles plain errors", async () => {
		const fakeProjectId = "803";

		const stub = new Stub({
			fixture: "errors/error_plain.json",
			uri: `projects/${fakeProjectId}/branches`,
			status: 401,
		});

		await stub.setStub();

		await expect(
			lokaliseApi.branches().list({ project_id: fakeProjectId }),
		).rejects.toMatchObject({
			message: "Auth error",
			code: 401,
			details: { reason: "server error without details" },
		});
	});

	it("handles plain errors with errorCode", async () => {
		const stub = new Stub({
			fixture: "errors/error_code.json",
			uri: `projects/${project_id}/branches`,
			status: 401,
		});

		await stub.setStub();

		await expect(
			lokaliseApi.branches().list({ project_id: project_id }),
		).rejects.toMatchObject({
			message: "Auth error",
			code: 401,
			details: { reason: "server error without details" },
		});
	});

	it("handles empty nested errors", async () => {
		const stub = new Stub({
			fixture: "errors/error_empty.json",
			uri: `projects/${project_id}/branches`,
			status: 401,
		});

		await stub.setStub();

		await expect(
			lokaliseApi.branches().list({ project_id: project_id }),
		).rejects.toMatchObject({
			message: "Unknown error",
			code: 500,
			details: { reason: "server error without details" },
		});
	});

	it("handles unexpected fetch errors", async () => {
		const originalFetch = global.fetch;
		global.fetch = vi.fn().mockRejectedValueOnce("unexpected fetch error");

		await expect(
			lokaliseApi.branches().list({ project_id: project_id }),
		).rejects.toMatchObject({
			message: "An unknown error occurred",
			code: 500,
			details: { reason: "unexpected fetch error" },
		});

		global.fetch = originalFetch;
	});

	it("handles errors when the response is unexpected", async () => {
		const originalFetch = global.fetch;
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: false,
			status: 400,
			statusText: "Bad Request",
			json: async () => "Very unexpected string in response",
			headers: new Headers(),
		} as Response);

		await expect(
			lokaliseApi.branches().list({ project_id: project_id }),
		).rejects.toMatchObject({
			message: "An unknown error occurred",
			code: 500,
			details: { reason: "unexpected response format" },
		});

		global.fetch = originalFetch;
	});

	it("handles params-related errors", async () => {
		const params = <ProjectWithPagination>{};

		await expect(lokaliseApi.branches().list(params)).rejects.toThrow(
			"Missing required parameter: project_id",
		);
	});

	it("handles error 500", async () => {
		const fakeProjectId = "803";
		const params = {
			name: "hotfix/really-important",
		};

		const stub = new Stub({
			fixture: "errors/error_500.json",
			uri: `projects/${fakeProjectId}/branches`,
			status: 500,
			body: params,
			method: "POST",
		});

		await stub.setStub();

		await expect(
			lokaliseApi.branches().create(params, { project_id: fakeProjectId }),
		).rejects.toMatchObject({
			message: "Something very bad has happened",
			code: 500,
			details: { reason: "server error without details" },
		});
	});
});
