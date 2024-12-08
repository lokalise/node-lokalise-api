import type { DownloadFileParams, QueuedProcess } from "../../src/main.js";
import type { FileFormat } from "../../src/types/file_format.js";
import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("Files", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const projectId = "803826145ba90b42d5d860.46800099";
	const processId = "8c951f34fcea49ad5647bc811fc59e1c9a485082";
	const data =
		"ewogICAgImZydWl0IjogIkFwcGxlIiwKICAgICJzaXplIjogIkxhcmdlIiwKICAgICJjb2xvciI6ICJSZWQiCn0=";

	it("lists", async () => {
		const stub = new Stub({
			fixture: "files/list.json",
			uri: `projects/${projectId}/files`,
			respHeaders: {
				"x-pagination-total-count": "5",
				"x-pagination-page": "1",
				"x-pagination-limit": "100",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const files = await lokaliseApi.files().list({ project_id: projectId });

		const file = files.items[0];

		expect(file.file_id).to.eq(81446);
		expect(file.filename).to.eq("%LANG_ISO%.yml");
		expect(file.key_count).to.eq(66);
	});

	it("lists and paginates", async () => {
		const params = { page: 2, limit: 1 };

		const stub = new Stub({
			fixture: "files/list_pagination.json",
			uri: `projects/${projectId}/files`,
			query: params,
			respHeaders: {
				"x-pagination-total-count": "5",
				"x-pagination-page": "2",
				"x-pagination-limit": "1",
				"x-pagination-page-count": "5",
			},
		});

		await stub.setStub();

		const files = await lokaliseApi.files().list({
			project_id: projectId,
			...params,
		});

		expect(files.items[0].filename).to.eq("my_filename.json");
		expect(files.totalResults).to.eq(5);
		expect(files.totalPages).to.eq(5);
		expect(files.resultsPerPage).to.eq(1);
		expect(files.currentPage).to.eq(2);
	});

	it("uploads", async () => {
		const params = {
			data: data,
			filename: "test_node.json",
			lang_iso: "en",
			format: <FileFormat>"json",
		};

		const stub = new Stub({
			fixture: "files/upload.json",
			uri: `projects/${projectId}/files/upload`,
			body: params,
			method: "POST",
		});

		await stub.setStub();

		const process: QueuedProcess = await lokaliseApi
			.files()
			.upload(projectId, params);

		expect(process.process_id).to.eq(processId);
		expect(process.type).to.eq("file-import");
		expect(process.status).to.eq("queued");
		expect(process.message).to.eq("");
		expect(process.created_by).to.eq(20181);
		expect(process.created_by_email).to.eq("bodrovis@protonmail.com");
		expect(process.created_at).to.eq("2023-09-21 11:33:19 (Etc/UTC)");
		expect(process.created_at_timestamp).to.eq(1695295999);
	});

	it("uploads without automations", async () => {
		const params = {
			data: data,
			filename: "test_node.json",
			lang_iso: "en",
			use_automations: false,
		};

		const stub = new Stub({
			fixture: "files/upload.json",
			uri: `projects/${projectId}/files/upload`,
			body: params,
			method: "POST",
		});

		await stub.setStub();

		const process: QueuedProcess = await lokaliseApi
			.files()
			.upload(projectId, params);

		expect(process.type).to.eq("file-import");
		expect(process.status).to.eq("queued");
	});

	it("raises error for malformed response", async () => {
		const params = {
			data: data,
			filename: "test_node.json",
			lang_iso: "en",
			format: <FileFormat>"json",
		};

		const stub = new Stub({
			fixture: "files/upload_malformed.json",
			uri: `projects/${projectId}/files/upload`,
			body: params,
			method: "POST",
		});

		await stub.setStub();

		try {
			await lokaliseApi.files().upload(projectId, params);
		} catch (e) {
			expect(e.message).toEqual(
				"Missing expected secondary property 'process' in JSON response.",
			);
		}
	});

	it("checks upload status", async () => {
		const stub = new Stub({
			fixture: "files/upload_process_check.json",
			uri: `projects/${projectId}/processes/${processId}`,
		});

		await stub.setStub();

		const process = await lokaliseApi.queuedProcesses().get(processId, {
			project_id: projectId,
		});

		expect(process.process_id).to.eq(processId);
		expect(process.status).to.eq("finished");
		expect(process.details.files.length).to.eq(1);
		const file = process.details.files[0];
		expect(file.name_original).to.eq("test_node.json");
		expect(file.word_count_total).to.eq(3);
		expect(file.status).to.eq("finished");
	});

	it("downloads", async () => {
		const params: DownloadFileParams = {
			format: <FileFormat>"json",
			original_filenames: true,
		};

		const stub = new Stub({
			fixture: "files/download.json",
			uri: `projects/${projectId}/files/download`,
			body: params,
			method: "POST",
		});

		await stub.setStub();

		const response = await lokaliseApi.files().download(projectId, params);

		expect(response.project_id).to.eq(projectId);
		expect(response.branch).to.eq("master");
		expect(response.bundle_url).to.include("s3.eu-central-1.amazonaws.com");
	});

	it("deletes", async () => {
		const fileId = "1876624";
		const docsProjectId = "75389866650c2d2dc84954.76033894";

		const stub = new Stub({
			fixture: "files/delete.json",
			uri: `projects/${docsProjectId}/files/${fileId}`,
			method: "DELETE",
		});

		await stub.setStub();

		const response = await lokaliseApi
			.files()
			.delete(fileId, { project_id: docsProjectId });

		expect(response.project_id).to.eq(docsProjectId);
		expect(response.file_deleted).to.be.true;
	});
});
