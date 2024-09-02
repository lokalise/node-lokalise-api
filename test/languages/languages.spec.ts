import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("Languages", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const projectId = "803826145ba90b42d5d860.46800099";
	const langId = 640;
	const secondLangId = 910;

	it("lists", async () => {
		const stub = new Stub({
			fixture: "languages/list.json",
			uri: `projects/${projectId}/languages`,
			respHeaders: {
				"x-pagination-total-count": "3",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const languages = await lokaliseApi.languages().list({
			project_id: projectId,
		});

		expect(languages.items[0].lang_id).to.eq(803);
		expect(languages.items[0].lang_name).to.eq("Albanian");
	});

	it("lists and paginates", async () => {
		const params = {
			page: 3,
			limit: 1,
		};

		const stub = new Stub({
			fixture: "languages/list_pagination.json",
			uri: `projects/${projectId}/languages`,
			query: params,
			respHeaders: {
				"x-pagination-total-count": "3",
				"x-pagination-page": "3",
				"x-pagination-limit": "1",
				"x-pagination-page-count": "3",
			},
		});

		await stub.setStub();

		const languages = await lokaliseApi.languages().list({
			project_id: projectId,
			...params,
		});

		expect(languages.items[0].lang_id).to.eq(langId);
		expect(languages.items[0].lang_name).to.eq("English");
		expect(languages.totalResults).to.eq(3);
		expect(languages.totalPages).to.eq(3);
		expect(languages.resultsPerPage).to.eq(1);
		expect(languages.currentPage).to.eq(3);
	});

	it("lists system languages with pagination", async () => {
		const params = {
			page: 3,
			limit: 2,
		};

		const stub = new Stub({
			fixture: "languages/list_system_pagination.json",
			uri: "system/languages",
			query: params,
			respHeaders: {
				"x-pagination-total-count": "619",
				"x-pagination-page": "3",
				"x-pagination-limit": "2",
				"x-pagination-page-count": "310",
			},
		});

		await stub.setStub();

		const languages = await lokaliseApi.languages().system_languages({
			...params,
		});

		expect(languages.items[0].lang_id).to.eq(792);
		expect(languages.items[0].lang_name).to.eq("Afrikaans (South Africa)");
		expect(languages.totalResults).to.eq(619);
		expect(languages.totalPages).to.eq(310);
		expect(languages.resultsPerPage).to.eq(2);
		expect(languages.currentPage).to.eq(3);
	});

	it("lists system languages", async () => {
		const stub = new Stub({
			fixture: "languages/list_system.json",
			uri: "system/languages",
			respHeaders: {
				"x-pagination-total-count": "619",
				"x-pagination-page": "1",
				"x-pagination-limit": "5000",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const languages = await lokaliseApi.languages().system_languages();

		expect(languages.items[0].lang_id).to.eq(792);
		expect(languages.items[0].lang_name).to.eq("Afrikaans (South Africa)");
	});

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "languages/retrieve.json",
			uri: `projects/${projectId}/languages/${langId}`,
		});

		await stub.setStub();

		const language = await lokaliseApi.languages().get(langId, {
			project_id: projectId,
		});

		expect(language.lang_id).to.eq(langId);
		expect(language.lang_name).to.eq("English");
		expect(language.lang_iso).to.eq("en");
		expect(language.is_rtl).to.be.false;
		expect(language.plural_forms).to.include("other");
	});

	it("creates", async () => {
		const params = [
			{
				lang_iso: "ak",
			},
		];

		const stub = new Stub({
			fixture: "languages/create.json",
			uri: `projects/${projectId}/languages`,
			body: { languages: params },
			method: "POST",
		});

		await stub.setStub();

		const languages = await lokaliseApi
			.languages()
			.create(params, { project_id: projectId });

		expect(languages.items[0].lang_id).to.eq(secondLangId);
		expect(languages.items[0].lang_name).to.eq("Akan");
		expect(languages.errors.length).to.eq(0);
	});

	it("updates", async () => {
		const params = {
			lang_name: "Akan Custom",
		};

		const stub = new Stub({
			fixture: "languages/update.json",
			uri: `projects/${projectId}/languages/${secondLangId}`,
			body: params,
			method: "PUT",
		});

		await stub.setStub();

		const language = await lokaliseApi
			.languages()
			.update(secondLangId, params, { project_id: projectId });

		expect(language.lang_id).to.eq(secondLangId);
		expect(language.lang_name).to.eq(params.lang_name);
	});

	it("deletes", async () => {
		const stub = new Stub({
			fixture: "languages/delete.json",
			uri: `projects/${projectId}/languages/${secondLangId}`,
			method: "DELETE",
		});

		await stub.setStub();

		const response = await lokaliseApi.languages().delete(secondLangId, {
			project_id: projectId,
		});

		expect(response.project_id).to.eq(projectId);
		expect(response.language_deleted).to.be.true;
		expect(response.branch).to.eq("master");
	});
});
