import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("QueuedProcesses", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const projectId = "803826145ba90b42d5d860.46800099";
	const processId = "7cedb0907b9c9fdccff10ddf2e8420c9f4bd3073";

	it("lists", async () => {
		const stub = new Stub({
			fixture: "queued_processes/list.json",
			uri: `projects/${projectId}/processes`,
			respHeaders: {
				"x-pagination-total-count": "3",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const processes = await lokaliseApi.queuedProcesses().list({
			project_id: projectId,
		});

		expect(processes.items[0].process_id).to.eq(processId);
	});

	it("lists and paginates", async () => {
		const params = {
			page: 2,
			limit: 1,
		};

		const stub = new Stub({
			fixture: "queued_processes/list_pagination.json",
			uri: `projects/${projectId}/processes`,
			query: params,
			respHeaders: {
				"x-pagination-total-count": "3",
				"x-pagination-page": "2",
				"x-pagination-limit": "1",
				"x-pagination-page-count": "3",
			},
		});

		await stub.setStub();

		const processes = await lokaliseApi.queuedProcesses().list({
			project_id: projectId,
			...params,
		});

		expect(processes.items[0].type).to.eq("file-import");
		expect(processes.totalResults).to.eq(3);
		expect(processes.totalPages).to.eq(3);
		expect(processes.resultsPerPage).to.eq(1);
		expect(processes.currentPage).to.eq(2);
	});

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "queued_processes/retrieve.json",
			uri: `projects/${projectId}/processes/${processId}`,
		});

		await stub.setStub();

		const process = await lokaliseApi.queuedProcesses().get(processId, {
			project_id: projectId,
		});

		expect(process.process_id).to.eq(processId);
		expect(process.type).to.eq("file-import");
		expect(process.status).to.eq("finished");
		expect(process.message).to.eq("");
		expect(process.created_by).to.eq(20181);
		expect(process.created_by_email).to.eq("bodrovis@protonmail.com");
		expect(process.created_at).to.eq("2023-09-19 13:26:18 (Etc/UTC)");
		expect(process.created_at_timestamp).to.eq(1695129978);
		expect(process.details.files.length).to.eq(1);

		const file = process.details.files[0];

		expect(file.name_original).to.eq("test_async.json");
		expect(file.word_count_total).to.eq(3);
		expect(file.status).to.eq("finished");
	});
});
