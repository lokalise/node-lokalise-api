import { describe, expect, it, LokaliseApi, Stub } from "../setup.js";

describe("Segments", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const projectId = "36730698650d6bd755c737.69639337";
	const keyId = 379099395;
	const segmentNumber = 1;
	const langISO = "en";

	it("lists", async () => {
		const params = {
			disable_references: 1,
			filter_unverified: 0,
		};

		const stub = new Stub({
			fixture: "segments/list.json",
			uri: `projects/${projectId}/keys/${keyId}/segments/${langISO}`,
			query: params,
		});

		await stub.setStub();

		const segments = await lokaliseApi.segments().list({
			project_id: projectId,
			key_id: keyId,
			language_iso: "en",
			...params,
		});

		expect(segments[0].language_iso).to.eq("en");
		expect(segments[1].value).to.eq("Pineapple");
	});

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "segments/retrieve.json",
			uri: `projects/${projectId}/keys/${keyId}/segments/${langISO}/${segmentNumber}`,
		});

		await stub.setStub();

		const segment = await lokaliseApi.segments().get(segmentNumber, {
			project_id: projectId,
			key_id: keyId,
			language_iso: "en",
		});

		expect(segment.segment_number).to.eq(segmentNumber);
		expect(segment.language_iso).to.eq("en");
		expect(segment.modified_at).to.eq("2023-09-22 10:26:50 (Etc/UTC)");
		expect(segment.modified_at_timestamp).to.eq(1695378410);
		expect(segment.modified_by).to.eq(20181);
		expect(segment.modified_by_email).to.eq("bodrovis@protonmail.com");
		expect(segment.value).to.eq("Macrosoft");
		expect(segment.is_fuzzy).to.eq(false);
		expect(segment.is_reviewed).to.eq(false);
		expect(segment.reviewed_by).to.eq(0);
		expect(segment.words).to.eq(1);
		expect(segment.custom_translation_statuses.length).to.eq(0);
	});

	it("retrieves with params", async () => {
		const params = {
			disable_references: 0,
		};

		const stub = new Stub({
			fixture: "segments/retrieve_params.json",
			uri: `projects/${projectId}/keys/${keyId}/segments/${langISO}/${segmentNumber}`,
			query: params,
		});

		await stub.setStub();

		const segment = await lokaliseApi.segments().get(segmentNumber, {
			project_id: projectId,
			key_id: keyId,
			language_iso: "en",
			...params,
		});

		expect(segment.segment_number).to.eq(segmentNumber);
		expect(segment.language_iso).to.eq("en");
		expect(segment.value).to.eq("Macrosoft");
	});

	it("updates", async () => {
		const params = {
			value: "Hello!",
			is_fuzzy: true,
		};

		const stub = new Stub({
			fixture: "segments/update.json",
			uri: `projects/${projectId}/keys/${keyId}/segments/${langISO}/${segmentNumber}`,
			body: params,
			method: "PUT",
		});

		await stub.setStub();

		const segment = await lokaliseApi.segments().update(segmentNumber, params, {
			project_id: projectId,
			key_id: keyId,
			language_iso: "en",
		});

		expect(segment.segment_number).to.eq(segmentNumber);
		expect(segment.is_fuzzy).to.be.true;
		expect(segment.value).to.eq(params.value);
	});
});
