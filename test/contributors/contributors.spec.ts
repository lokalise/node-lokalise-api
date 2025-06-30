import { describe, expect, it, LokaliseApi, Stub } from "../setup.js";

describe("Contributors", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const projectId = "803826145ba90b42d5d860.46800099";
	const userId = 20181;
	const newUserId = 308781;

	it("lists", async () => {
		const stub = new Stub({
			fixture: "contributors/list.json",
			uri: `projects/${projectId}/contributors`,
			respHeaders: {
				"x-pagination-total-count": "3",
				"x-pagination-page": "1",
				"x-pagination-limit": "100",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const contributors = await lokaliseApi.contributors().list({
			project_id: projectId,
		});

		expect(contributors.items[0].user_id).to.eq(25753);
	});

	it("lists and paginates", async () => {
		const params = { page: 2, limit: 3 };
		const stub = new Stub({
			fixture: "contributors/list_pagination.json",
			uri: `projects/${projectId}/contributors`,
			query: params,
			respHeaders: {
				"x-pagination-total-count": "6",
				"x-pagination-page": "2",
				"x-pagination-limit": "3",
				"x-pagination-page-count": "2",
			},
		});

		await stub.setStub();

		const contributors = await lokaliseApi.contributors().list({
			project_id: projectId,
			...params,
		});

		expect(contributors.items[0].user_id).to.eq(31113);
		expect(contributors.totalResults).to.eq(6);
		expect(contributors.totalPages).to.eq(2);
		expect(contributors.resultsPerPage).to.eq(3);
		expect(contributors.currentPage).to.eq(2);
		expect(contributors.isFirstPage()).to.be.false;
		expect(contributors.isLastPage()).to.be.true;
		expect(contributors.nextPage()).to.eq(2);
		expect(contributors.prevPage()).to.eq(1);
	});

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "contributors/retrieve.json",
			uri: `projects/${projectId}/contributors/${userId}`,
		});

		await stub.setStub();

		const contributor = await lokaliseApi.contributors().get(userId, {
			project_id: projectId,
		});

		expect(contributor.user_id).to.eq(userId);
		expect(contributor.email).to.eq("bodrovis@protonmail.com");
		expect(contributor.fullname).to.eq("Ilya B");
		expect(contributor.created_at).to.eq("2018-08-21 15:35:25 (Etc/UTC)");
		expect(contributor.created_at_timestamp).to.eq(1534865725);
		expect(contributor.is_admin).to.be.true;
		expect(contributor.is_reviewer).to.be.true;
		expect(contributor.languages[0].lang_id).to.eq(803);
		expect(contributor.languages[0].lang_iso).to.eq("sq");
		expect(contributor.admin_rights).to.include("upload");
		expect(contributor.role_id).to.eq(5);
		expect(contributor.uuid).to.eq("123-abc");
	});

	it("retrieves current contributor details", async () => {
		const stub = new Stub({
			fixture: "contributors/me.json",
			uri: `projects/${projectId}/contributors/me`,
		});

		await stub.setStub();

		const contributor = await lokaliseApi.contributors().me({
			project_id: projectId,
		});

		expect(contributor.user_id).to.eq(20181);
		expect(contributor.email).to.eq("bodrovis@protonmail.com");
		expect(contributor.fullname).to.eq("Ilya B");
		expect(contributor.created_at).to.eq("2018-08-21 15:35:25 (Etc/UTC)");
		expect(contributor.created_at_timestamp).to.eq(1534865725);
		expect(contributor.is_admin).to.be.true;
		expect(contributor.is_reviewer).to.be.true;
	});

	it("creates", async () => {
		const params = [
			{
				email: "translator4@mycompany.com",
				fullname: "Mr. Translator",
				is_admin: false,
				is_reviewer: true,
				languages: [
					{
						lang_iso: "en",
						is_writable: false,
					},
					{
						lang_iso: "sq",
						is_writable: true,
					},
				],
			},
		];

		const stub = new Stub({
			fixture: "contributors/create.json",
			uri: `projects/${projectId}/contributors`,
			method: "POST",
			body: { contributors: params },
		});

		await stub.setStub();

		const contributors = await lokaliseApi
			.contributors()
			.create(params, { project_id: projectId });

		expect(contributors[0].email).to.eq(params[0].email);
	});

	it("updates", async () => {
		const params = { is_admin: true };

		const stub = new Stub({
			fixture: "contributors/update.json",
			method: "PUT",
			body: params,
			uri: `projects/${projectId}/contributors/${newUserId}`,
		});

		await stub.setStub();

		const contributor = await lokaliseApi
			.contributors()
			.update(newUserId, params, { project_id: projectId });

		expect(contributor.user_id).to.eq(newUserId);
		expect(contributor.is_admin).to.be.true;
	});

	it("deletes", async () => {
		const stub = new Stub({
			fixture: "contributors/delete.json",
			method: "DELETE",
			uri: `projects/${projectId}/contributors/${newUserId}`,
		});

		await stub.setStub();

		const response = await lokaliseApi.contributors().delete(newUserId, {
			project_id: projectId,
		});

		expect(response.project_id).to.eq(projectId);
		expect(response.branch).to.eq("master");
		expect(response.contributor_deleted).to.be.true;
	});
});
