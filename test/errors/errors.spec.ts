import type { ApiError, ProjectWithPagination } from "../../src/main.js";
import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("Errors", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const project_id = "803826145ba90b42d5d860.46800099";

	it("is expected to reject with proper http message and status code if json is not parsable", async () => {
		const stub = new Stub({
			data: "Too many requests",
			uri: `projects/${project_id}`,
			status: 429,
		});

		await stub.setStub();

		try {
			expect(await lokaliseApi.projects().get(project_id)).to.throw();
		} catch (error) {
			expect(error).to.deep.equal({ message: "Too Many Requests", code: 429 });
		}
	});

	it("handles exceptions", async () => {
		const fakeProjectId = "803";

		const stub = new Stub({
			uri: `projects/${fakeProjectId}/branches`,
			doFail: true,
		});

		await stub.setStub();

		await lokaliseApi
			.branches()
			.list({
				project_id: fakeProjectId,
			})
			.catch((e: ApiError) => {
				expect(e.message).to.include("failed");
			});
	});

	it("handles plain errors", async () => {
		const fakeProjectId = "803";

		const stub = new Stub({
			fixture: "errors/error_plain.json",
			uri: `projects/${fakeProjectId}/branches`,
			status: 401,
		});

		await stub.setStub();

		await lokaliseApi
			.branches()
			.list({ project_id: fakeProjectId })
			.catch((e: ApiError) => {
				expect(e.message).to.eq("Auth error");
				expect(e.code).to.eq(401);
			});
	});

	it("handles params-related errors", async () => {
		const params = <ProjectWithPagination>{};

		await lokaliseApi
			.branches()
			.list(params)
			.catch((e: Error) => {
				expect(e.message).to.eq("Missing required param: project_id");
			});
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

		await lokaliseApi
			.branches()
			.create(params, { project_id: fakeProjectId })
			.catch((e: ApiError) => {
				expect(e.message).to.eq("Something very bad has happened");
				expect(e.code).to.eq(500);
			});
	});
});
