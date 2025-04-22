import type {
	CreateTermsParams,
	ListTermsParams,
	UpdateTermsParams,
} from "../../src/main.js";
import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("GlossaryTerms", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const projectId = "6504960967ab53d45e0ed7.15877499";
	const termId = 5319746;

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "glossary_terms/retrieve.json",
			uri: `projects/${projectId}/glossary-terms/${termId}`,
		});

		await stub.setStub();

		const termObject = await lokaliseApi.glossaryTerms().get(termId, {
			project_id: projectId,
		});

		expect(termObject.id).toEqual(termId);
		expect(termObject.term).toEqual("router");
		expect(termObject.description).toEqual("A network device");
		expect(termObject.caseSensitive).toEqual(false);
		expect(termObject.translatable).toEqual(true);
		expect(termObject.forbidden).toEqual(false);
		expect(termObject.tags).toContain("sample");
		expect(termObject.createdAt).toEqual("2025-03-31 15:01:00 (Etc/UTC)");
		expect(termObject.updatedAt).toEqual(null);

		const translation = termObject.translations[0];
		expect(translation.langId).toEqual(597);
		expect(translation.langName).toEqual("Russian");
		expect(translation.langIso).toEqual("ru");
		expect(translation.translation).toEqual("маршрутизатор");
		expect(translation.description).toEqual("описание");
	});

	it("lists", async () => {
		const params: ListTermsParams = {
			project_id: projectId,
			limit: 2,
		};

		const { project_id, ...stubParams } = params;

		const stub = new Stub({
			fixture: "glossary_terms/list.json",
			uri: `projects/${projectId}/glossary-terms`,
			query: stubParams,
			respHeaders: {
				"x-pagination-next-cursor": "5489103",
			},
		});

		await stub.setStub();

		const terms = await lokaliseApi.glossaryTerms().list({
			...params,
		});

		expect(terms.items.length).toEqual(2);
		expect(terms.items[0].id).toEqual(termId);

		expect(terms.nextCursor).toEqual("5489103");
	});

	it("creates", async () => {
		const term_params: CreateTermsParams = {
			terms: [
				{
					term: "test",
					description: "sample desc",
					caseSensitive: false,
					forbidden: false,
					translatable: true,
				},
			],
		};

		const stub = new Stub({
			fixture: "glossary_terms/create.json",
			uri: `projects/${projectId}/glossary-terms`,
			body: term_params,
			method: "POST",
		});

		await stub.setStub();

		const terms = await lokaliseApi
			.glossaryTerms()
			.create(term_params, { project_id: projectId });

		expect(terms.items.length).toEqual(1);
		expect(terms.items[0].term).toEqual("test");
		expect(terms.items[0].caseSensitive).toEqual(false);
	});

	it("updates", async () => {
		const term_params: UpdateTermsParams = {
			terms: [
				{
					id: 12345,
					term: "test updated",
					description: "sample desc updated",
				},
			],
		};

		const stub = new Stub({
			fixture: "glossary_terms/update.json",
			uri: `projects/${projectId}/glossary-terms`,
			body: term_params,
			method: "PUT",
		});

		await stub.setStub();

		const terms = await lokaliseApi
			.glossaryTerms()
			.update(term_params, { project_id: projectId });

		expect(terms.items.length).toEqual(1);
		expect(terms.items[0].term).toEqual("test updated");
		expect(terms.items[0].caseSensitive).toEqual(false);
	});

	it("deletes", async () => {
		const term_ids = [12345, 3343];

		const stub = new Stub({
			fixture: "glossary_terms/delete.json",
			uri: `projects/${projectId}/glossary-terms`,
			body: { terms: term_ids },
			method: "DELETE",
		});

		await stub.setStub();

		const termsDeleted = await lokaliseApi
			.glossaryTerms()
			.delete(term_ids, { project_id: projectId });

		expect(termsDeleted.deleted.count).toEqual(1);
		expect(termsDeleted.deleted.ids).toEqual([12345]);
		expect(termsDeleted.failed[0].message).toEqual("Term IDs not found");
	});
});
