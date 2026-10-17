import { ProjectItemVantage as ProjectItem } from "../../../src/models/vantage/project_item.js";
import { getCollectionItem } from "../../helpers/collection.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub } from "../../setup.js";

describe("Project items", () => {
	const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";
	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	it("lists", async () => {
		const stub = new Stub({
			fixture: "vantage/project_items/list.json",
			uri: `projects/${project_id}/items`,
			version: "vantage/v1",
		});

		await stub.setStub();

		const projectItems = await lokaliseVantageApi
			.projectItems()
			.list({ project_id });
		expect(projectItems.items.length).toBe(2);
		expect(projectItems.count).toBe(2);
		expect(projectItems.hasMore).toBe(false);
		expect(projectItems.cursor?.length).toBeGreaterThan(0);

		const projectItem = getCollectionItem(projectItems, 0);
		expect(projectItem).toBeInstanceOf(ProjectItem);
		expect(projectItem.id).toBe("019d29da-3f21-dad8-0084-175d6fea47d2");
		expect(projectItem.projectId).toBe(project_id);
		expect(projectItem.name).toBe("alice.md");
		expect(projectItem.createdAt).toBe("2026-03-26T11:14:22.114Z");
		expect(projectItem.updatedAt).toBe("2026-03-26T11:14:22.496Z");
	});

	it("lists with params", async () => {
		const query = {
			"filter-names": ["alice.md"],
		};

		const stub = new Stub({
			fixture: "vantage/project_items/list_params.json",
			uri: `projects/${project_id}/items`,
			version: "vantage/v1",
			query,
		});

		await stub.setStub();

		const projectItems = await lokaliseVantageApi
			.projectItems()
			.list({ project_id, ...query });

		expect(projectItems.items.length).toBe(1);
		expect(projectItems.count).toBe(1);
		expect(projectItems.hasMore).toBe(false);

		const projectItem = getCollectionItem(projectItems, 0);
		expect(projectItem).toBeInstanceOf(ProjectItem);
		expect(projectItem.projectId).toBe(project_id);
		expect(projectItem.name).toBe("alice.md");
	});
});
