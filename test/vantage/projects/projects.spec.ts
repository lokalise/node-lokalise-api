import { ProjectVantage as Project } from "../../../src/models/vantage/project.js";
import { getCollectionItem } from "../../helpers/collection.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub } from "../../setup.js";

describe("Projects", () => {
	const team_id = "9ef160a0-d4c7-45f5-ab80-bc9e22e95b12";
	const uri = `teams/${team_id}/projects`;
	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	it("lists", async () => {
		const stub = new Stub({
			fixture: "vantage/projects/list.json",
			uri,
			version: "vantage/v1",
		});

		await stub.setStub();

		const projects = await lokaliseVantageApi.projects().list({ team_id });

		expect(projects.items.length).toBe(2);
		expect(projects.count).toBe(2);
		expect(projects.hasMore).toBe(true);
		expect(projects.cursor).toBe("eyIxIjo2MDE1ODJ9");

		const alice = getCollectionItem(projects, 0);
		expect(alice).toBeInstanceOf(Project);
		expect(alice.projectId).toBe("019d29d9-de47-7a57-ac2d-53194197d213");
		expect(alice.teamId).toBe(team_id);
		expect(alice.name).toBe("Alice");
		expect(alice.description).toBe("");
		expect(alice.baseLanguage.languageId).toBe(
			"019d29d9-de52-7ba2-87c6-b5355ebf9c72",
		);
		expect(alice.baseLanguage.locale).toBe("en");
		expect(alice.targetLanguages).toHaveLength(1);
		expect(alice.targetLanguages[0]?.locale).toBe("fr");
		expect(alice.translationSettings).toEqual({
			workflowType: "AI_HUMAN_REVIEW",
			reviewThreshold: "FULL_REVIEW",
			reviewTurnaroundDays: 5,
		});
		expect(alice.contentSourceType).toBe("file");
		expect(alice.contentSourceName).toBeNull();
		expect(alice.projectType).toBe("marketing");

		const gdrive = getCollectionItem(projects, 1);
		expect(gdrive).toBeInstanceOf(Project);
		expect(gdrive.name).toBe("GDrive");
		expect(gdrive.translationSettings).toEqual({
			workflowType: "AI_ONLY",
			reviewThreshold: null,
			reviewTurnaroundDays: 5,
		});
		expect(gdrive.contentSourceType).toBe("google-drive");
		expect(gdrive.contentSourceName).toBe("Google Drive");
		expect(gdrive.projectType).toBe("marketing_integrations");
	});

	it("lists with params", async () => {
		const query = { limit: 2 };
		const stub = new Stub({
			fixture: "vantage/projects/list_params.json",
			uri,
			version: "vantage/v1",
			query,
		});

		await stub.setStub();

		const projects = await lokaliseVantageApi.projects().list({
			team_id,
			...query,
		});

		expect(projects.items.length).toBe(2);
		expect(projects.count).toBe(2);
		expect(projects.hasMore).toBe(true);
		expect(projects.cursor).toBe("eyIxIjo2MDE1ODJ9");
		expect(projects.items.map((project) => project.name)).toEqual([
			"Alice",
			"GDrive",
		]);
	});

	it("lists with cursor pagination", async () => {
		const firstQuery = { limit: 1 };
		const firstStub = new Stub({
			fixture: "vantage/projects/page_1.json",
			uri,
			version: "vantage/v1",
			query: firstQuery,
		});

		await firstStub.setStub();

		const firstPage = await lokaliseVantageApi.projects().list({
			team_id,
			...firstQuery,
		});

		expect(firstPage.items).toHaveLength(1);
		expect(firstPage.count).toBe(1);
		expect(firstPage.hasMore).toBe(true);
		expect(firstPage.cursor).toBe("eyIxIjo2MDA3NjR9");

		if (!firstPage.cursor) {
			throw new Error("Expected pagination cursor");
		}

		const secondQuery = {
			after: firstPage.cursor,
			limit: 1,
		};
		const secondStub = new Stub({
			fixture: "vantage/projects/page_2.json",
			uri,
			version: "vantage/v1",
			query: secondQuery,
		});

		await secondStub.setStub();

		const secondPage = await lokaliseVantageApi.projects().list({
			team_id,
			...secondQuery,
		});

		expect(secondPage.items).toHaveLength(1);
		expect(secondPage.count).toBe(1);
		expect(secondPage.cursor).toBe("eyIxIjo2MDE1ODJ9");
		expect(secondPage.hasMore).toBe(true);

		const firstProject = getCollectionItem(firstPage, 0);
		const secondProject = getCollectionItem(secondPage, 0);
		expect(firstProject.projectId).not.toBe(secondProject.projectId);
		expect(firstProject.name).toBe("Alice");
		expect(secondProject.name).toBe("GDrive");
		expect(secondProject).toBeInstanceOf(Project);
	});

	it("gets", async () => {
		const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";

		const stub = new Stub({
			fixture: "vantage/projects/get.json",
			uri: `projects/${project_id}`,
			version: "vantage/v1",
		});

		await stub.setStub();

		const project = await lokaliseVantageApi.projects().get({ project_id });

		expect(project).toBeInstanceOf(Project);
		expect(project.projectId).toBe(project_id);
		expect(project.teamId).toBe("9ef160a0-d4c7-45f5-ab80-bc9e22e95b12");
		expect(project.name).toBe("Alice");
		expect(project.description).toBe("");

		expect(project.baseLanguage).toMatchObject({
			languageId: "019d29d9-de52-7ba2-87c6-b5355ebf9c72",
			locale: "en",
		});

		expect(project.targetLanguages).toHaveLength(1);
		expect(project.targetLanguages[0]).toMatchObject({
			languageId: "019d29d9-de52-7ba2-87c6-b5355efd2aa7",
			locale: "fr",
		});

		expect(project.translationSettings).toEqual({
			workflowType: "AI_HUMAN_REVIEW",
			reviewThreshold: "FULL_REVIEW",
			reviewTurnaroundDays: 5,
		});

		expect(project.contentSourceType).toBe("file");
		expect(project.contentSourceName).toBeNull();
		expect(project.projectType).toBe("marketing");
	});
});
