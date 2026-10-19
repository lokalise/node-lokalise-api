import { createHash } from "node:crypto";
import { UploadVantage as Upload } from "../../../src/models/vantage/upload.js";
import { UploadStageVantage } from "../../../src/models/vantage/upload_stage.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub, vi } from "../../setup.js";

describe("Uploads", () => {
	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";

	it("lists uploads", async () => {
		const stub = new Stub({
			fixture: "vantage/uploads/list.json",
			uri: `projects/${project_id}/uploads`,
			version: "vantage/v1",
			query: { limit: 10 },
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.uploads().list({
			project_id,
			limit: 10,
		});

		expect(result.count).toBe(2);
		expect(result.cursor).toBe("019d29d9-fa77-775d-8dc3-c38616fb3b20");
		expect(result.hasMore).toBe(false);
		expect(result.items).toHaveLength(2);

		const first = result.items[0];
		const second = result.items[1];

		expect(first).toBeInstanceOf(Upload);
		expect(first?.uploadId).toBe("019efe5f-f028-703d-883c-2c03c6ae7a84");
		expect(first?.batchId).toBe(project_id);
		expect(first?.fileName).toBe("alice.docx");
		expect(first?.size).toBe(7079);
		expect(first?.createdAt).toBe("2026-06-25T10:42:40.808Z");
		expect(first?.status).toBe("IMPORTED");
		expect(first?.wordCount).toBe(407);
		expect(first?.locale).toBe("en");
		expect(first?.itemId).toBe("019efe60-00ef-a7a1-c448-74e764fdbdea");
		expect(first?.error).toBeUndefined();

		expect(second).toBeInstanceOf(Upload);
		expect(second?.uploadId).toBe("019d29d9-fa77-775d-8dc3-c38616fb3b20");
		expect(second?.fileName).toBe("alice.md");
		expect(second?.size).toBe(2174);
		expect(second?.createdAt).toBe("2026-03-26T11:14:04.535Z");
		expect(second?.status).toBe("IMPORTED");
		expect(second?.wordCount).toBe(407);
		expect(second?.locale).toBe("en");
		expect(second?.itemId).toBe("019d29da-3f21-dad8-0084-175d6fea47d2");
		expect(second?.error).toBeUndefined();
	});

	it("lists failed uploads", async () => {
		const stub = new Stub({
			fixture: "vantage/uploads/list_failed.json",
			uri: `projects/${project_id}/uploads`,
			version: "vantage/v1",
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.uploads().list({
			project_id,
		});

		expect(result.count).toBe(1);
		expect(result.items).toHaveLength(1);

		const upload = result.items[0];

		expect(upload).toBeInstanceOf(Upload);
		expect(upload?.status).toBe("UPLOAD_FAILED");
		expect(upload?.error).toEqual({
			code: "EXAMPLE_ERROR",
			message: "Upload failed",
		});
		expect(upload?.wordCount).toBeUndefined();
		expect(upload?.locale).toBeUndefined();
		expect(upload?.itemId).toBeUndefined();
	});

	it("stages files for upload", async () => {
		const files = [
			{
				fileName: "vantage-test.md",
				mimeType: "text/markdown",
				content: Buffer.from("# Vantage SDK test\n\nHello from the Node.js SDK!\n", "utf8"),
			},
			{
				fileName: "vantage-test.html",
				mimeType: "text/html",
				content: Buffer.from(
					"<!DOCTYPE html><html><body><h1>Vantage SDK test</h1><p>Hello from the Node.js SDK!</p></body></html>",
					"utf8",
				),
			},
		];

		const stub = new Stub({
			fixture: "vantage/uploads/create.json",
			uri: `projects/${project_id}/uploads`,
			version: "vantage/v1",
			method: "POST",
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.uploads().create(
			{ project_id },
			{
				uploads: files.map((file) => ({
					fileName: file.fileName,
					mimeType: file.mimeType,
					size: file.content.byteLength,
					checksum: createHash("md5").update(file.content).digest("hex"),
				})),
			},
		);

		expect(result).toBeInstanceOf(UploadStageVantage);
		expect(result.batchId).toBe("01a1545a-b48f-47a3-d2bd-953ac4c2427d");
		expect(result.uploads).toHaveLength(2);

		const markdown = result.uploads[0];
		const html = result.uploads[1];

		expect(markdown?.fileName).toBe("vantage-test.md");
		expect(html?.fileName).toBe("vantage-test.html");

		for (const item of result.uploads) {
			expect(item.status).toBe("UPLOADING");
			expect(item.uploadId).toBeDefined();
			expect(item.error).toBeUndefined();

			expect(item.upload?.url).toContain("https://");
			expect(item.upload?.fields["Content-MD5"]).toBeDefined();
			expect(item.upload?.fields["X-Amz-Algorithm"]).toBe("AWS4-HMAC-SHA256");
			expect(item.upload?.fields["X-Amz-Signature"]).toBeDefined();
			expect(item.upload?.fields.Policy).toBeDefined();
			expect(item.upload?.fields.key).toBeDefined();
			expect(item.upload?.expiresAt).toBe("2026-10-19T13:34:53.000Z");
		}

		expect(markdown?.upload?.fields["Content-MD5"]).toBe("l1FqaDTofj9AB4hiMKDdTg==");
		expect(html?.upload?.fields["Content-MD5"]).toBe("oGpk52OZT+aZTmQuODgM3g==");
	});

	it("uploads and imports files", async () => {
		const files = [
			{
				fileName: "vantage-test.md",
				mimeType: "text/markdown",
				content: Buffer.from("# Vantage SDK test\n\nHello from the Node.js SDK!\n", "utf8"),
			},
			{
				fileName: "vantage-test.html",
				mimeType: "text/html",
				content: Buffer.from(
					"<!DOCTYPE html><html><body><h1>Vantage SDK test</h1><p>Hello from the Node.js SDK!</p></body></html>",
					"utf8",
				),
			},
		];

		// Step 1: Stage the files.
		const stageStub = new Stub({
			fixture: "vantage/uploads/create.json",
			uri: `projects/${project_id}/uploads`,
			version: "vantage/v1",
			method: "POST",
			status: 201,
		});

		await stageStub.setStub();

		const staged = await lokaliseVantageApi.uploads().create(
			{ project_id },
			{
				uploads: files.map((file) => ({
					fileName: file.fileName,
					mimeType: file.mimeType,
					size: file.content.byteLength,
					checksum: createHash("md5").update(file.content).digest("hex"),
				})),
			},
		);

		expect(staged.uploads).toHaveLength(2);

		// Step 2: Simulate sending the files directly to S3.
		// Mock fetch only during S3 uploads, leaving SDK requests untouched.
		const s3Fetch = vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
			const url =
				typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

			expect(url).toBe("https://example-bucket.s3.eu-central-1.amazonaws.com/");
			expect(init?.method).toBe("POST");
			expect(init?.body).toBeInstanceOf(FormData);

			// S3 responds with 204 and no body on success.
			return new Response(null, { status: 204 });
		});

		try {
			for (const item of staged.uploads) {
				if (item.error) {
					throw new Error(`Failed to stage ${item.fileName}: ${item.error.message}`);
				}

				const file = files.find((file) => file.fileName === item.fileName);

				if (!file) {
					throw new Error(`File not found: ${item.fileName}`);
				}

				const form = new FormData();

				// Preserve every field returned by the API.
				for (const [key, value] of Object.entries(item.upload.fields)) {
					form.append(key, value);
				}

				if (!Object.hasOwn(item.upload.fields, "Content-Type")) {
					form.append("Content-Type", file.mimeType);
				}

				form.append(
					"file",
					new Blob([Uint8Array.from(file.content)], {
						type: file.mimeType,
					}),
					file.fileName,
				);

				// Verify the S3 form before submitting it.
				expect(form.get("Content-Type")).toBe(file.mimeType);

				expect(form.get("Content-MD5")).toBe(
					createHash("md5").update(file.content).digest("base64"),
				);

				for (const [key, value] of Object.entries(item.upload.fields)) {
					expect(form.get(key)).toBe(value);
				}

				const uploadedFile = form.get("file");
				expect(uploadedFile).toBeInstanceOf(Blob);

				if (!(uploadedFile instanceof Blob)) {
					throw new Error("Expected a file in FormData");
				}

				expect(Buffer.from(await uploadedFile.arrayBuffer())).toEqual(file.content);

				const response = await fetch(item.upload.url, {
					method: "POST",
					body: form,
				});

				expect(response.status).toBe(204);
				expect(response.ok).toBe(true);
			}

			expect(s3Fetch).toHaveBeenCalledTimes(2);
		} finally {
			s3Fetch.mockRestore();
		}

		// Step 3: Notify Vantage that S3 uploads are complete.
		const completeStub = new Stub({
			uri: `projects/${project_id}/uploads/actions/complete`,
			version: "vantage/v1",
			method: "POST",
			status: 202,
			data: "",
		});

		await completeStub.setStub();

		const completed = await lokaliseVantageApi
			.uploads()
			.complete({ project_id }, { batchId: staged.batchId });

		expect(completed).toBeUndefined();

		// Step 4: Check that both uploads are ready for import.
		const listStub = new Stub({
			fixture: "vantage/uploads/workflow_uploaded.json",
			uri: `projects/${project_id}/uploads`,
			version: "vantage/v1",
			query: { "filter-batch-id": staged.batchId },
		});

		await listStub.setStub();

		const uploads = await lokaliseVantageApi.uploads().list({
			project_id,
			"filter-batch-id": staged.batchId,
		});

		expect(uploads.count).toBe(2);
		expect(uploads.items).toHaveLength(2);

		for (const item of staged.uploads) {
			if (!item.uploadId) {
				throw new Error(`Missing upload ID for ${item.fileName}`);
			}

			const uploaded = uploads.items.find((uploaded) => uploaded.uploadId === item.uploadId);

			expect(uploaded).toBeDefined();
			expect(uploaded?.status).toBe("UPLOADED");
			expect(uploaded?.batchId).toBe(staged.batchId);
			expect(uploaded?.itemId).toBeUndefined();
		}

		// Step 5: Import the batch into the project.
		const importStub = new Stub({
			fixture: "vantage/imports/create_batch.json",
			uri: `projects/${project_id}/imports`,
			version: "vantage/v1",
			method: "POST",
			status: 202,
		});

		await importStub.setStub();

		const imported = await lokaliseVantageApi
			.imports()
			.create({ project_id }, { batchId: staged.batchId });

		expect(imported.importId).toBe("019d29da-1111-4111-8111-111111111111");

		// Step 6: Check the translation status for this import.
		const statusStub = new Stub({
			fixture: "vantage/translation_statuses/workflow_get.json",
			uri: `projects/${project_id}/translation-statuses/${imported.importId}`,
			version: "vantage/v1",
		});

		await statusStub.setStub();

		const translationStatus = await lokaliseVantageApi.translationStatuses().get({
			project_id,
			import_id: imported.importId,
		});

		expect(translationStatus.projectId).toBe(project_id);
		expect(translationStatus.importId).toBe(imported.importId);
		expect(translationStatus.status).toBe("PENDING_REVIEW");

		expect(translationStatus.languages).toHaveLength(1);
		expect(translationStatus.languages[0]?.locale).toBe("fr");
		expect(translationStatus.languages[0]?.status).toBe("PENDING_REVIEW");
	});

	it("completes staged uploads", async () => {
		const batchId = "01a15462-0f95-ada0-169a-b099132a2c55";

		const stub = new Stub({
			uri: `projects/${project_id}/uploads/actions/complete`,
			version: "vantage/v1",
			method: "POST",
			status: 202,
			data: "",
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.uploads().complete({ project_id }, { batchId });

		expect(result).toBeUndefined();
	});
});
