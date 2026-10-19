import { TaskVantage as Task } from "../../../src/models/vantage/task.js";
import { getCollectionItem } from "../../helpers/collection.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub } from "../../setup.js";

describe("Tasks", () => {
	const team_id = "9ef160a0-d4c7-45f5-ab80-bc9e22e95b12";
	const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";
	const uri = `teams/${team_id}/projects/${project_id}/tasks`;
	const version = "vantage/v1";
	const firstTaskId = "019efe61-65fc-7e82-94bd-0856e9211f1c";
	const secondTaskId = "019d29dc-0543-7dbe-885a-129ffc89c883";
	const languageId = "019d29d9-de52-7ba2-87c6-b5355efd2aa7";

	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	it("lists", async () => {
		const stub = new Stub({
			fixture: "vantage/tasks/list.json",
			uri,
			version,
		});

		await stub.setStub();

		const tasks = await lokaliseVantageApi.tasks().list({ team_id, project_id });

		expect(tasks.items.length).toBe(2);
		expect(tasks.count).toBe(2);
		expect(tasks.cursor).toBe(secondTaskId);
		expect(tasks.hasMore).toBe(false);

		const task = getCollectionItem(tasks, 0);
		expect(task).toBeInstanceOf(Task);
		expect(task.id).toBe(firstTaskId);
		expect(task.publicId).toBe("RE-8");
		expect(task.title).toBe("alice");
		expect(task.type).toBe("review");
		expect(task.status).toBe("created");
		expect(task.description).toBeNull();
		expect(task.dueDate).toBe("2026-09-30T23:59:59.000Z");
		expect(task.createdAt).toBe("2026-06-25T10:44:16.519Z");
		expect(task.requestedBy).toBeNull();

		const assignment = task.taskAssignments[0];
		expect(assignment?.languageId).toBe(languageId);
		expect(assignment?.assignees).toEqual([
			{
				contributorId: "01655d20-5648-7d1e-8dd7-6206606b7818",
				type: "user",
			},
		]);
		expect(assignment?.progress).toEqual({
			completedUnits: 0,
			totalUnits: 40,
			completedWords: 0,
			totalWords: 399,
		});
		expect(assignment?.segments).toEqual([]);

		const otherTask = getCollectionItem(tasks, 1);
		expect(otherTask).toBeInstanceOf(Task);
		expect(otherTask.id).toBe(secondTaskId);
		expect(otherTask.dueDate).toBeNull();
		expect(otherTask.taskAssignments[0]?.assignees).toHaveLength(3);
		expect(otherTask.taskAssignments[0]?.progress.completedUnits).toBe(3);
	});

	it("lists with params", async () => {
		const query = { "filter-ids": [firstTaskId] };
		const stub = new Stub({
			fixture: "vantage/tasks/list_params.json",
			uri,
			version,
			query,
		});

		await stub.setStub();

		const tasks = await lokaliseVantageApi.tasks().list({ team_id, project_id, ...query });

		expect(tasks.items.length).toBe(1);
		expect(tasks.count).toBe(1);
		expect(tasks.cursor).toBe(firstTaskId);
		expect(tasks.hasMore).toBe(false);

		const task = getCollectionItem(tasks, 0);
		expect(task).toBeInstanceOf(Task);
		expect(task.id).toBe(firstTaskId);
		expect(task.publicId).toBe("RE-8");
	});

	it("lists with cursor pagination", async () => {
		const firstQuery = { limit: 1 };
		const firstStub = new Stub({
			fixture: "vantage/tasks/page_1.json",
			uri,
			version,
			query: firstQuery,
		});

		await firstStub.setStub();

		const firstPage = await lokaliseVantageApi.tasks().list({ team_id, project_id, ...firstQuery });

		expect(firstPage.items).toHaveLength(1);
		expect(firstPage.count).toBe(1);
		expect(firstPage.hasMore).toBe(true);
		expect(firstPage.cursor).toBe(firstTaskId);

		if (!firstPage.cursor) {
			throw new Error("Expected pagination cursor");
		}

		const secondQuery = { after: firstPage.cursor, limit: 1 };
		const secondStub = new Stub({
			fixture: "vantage/tasks/page_2.json",
			uri,
			version,
			query: secondQuery,
		});

		await secondStub.setStub();

		const secondPage = await lokaliseVantageApi
			.tasks()
			.list({ team_id, project_id, ...secondQuery });

		expect(secondPage.items).toHaveLength(1);
		expect(secondPage.count).toBe(1);
		expect(secondPage.hasMore).toBe(false);
		expect(secondPage.cursor).toBe(secondTaskId);
		expect(getCollectionItem(secondPage, 0).id).toBe(secondTaskId);
		expect(secondPage.items.map((task) => task.id)).not.toEqual(
			firstPage.items.map((task) => task.id),
		);
	});

	it("lists with segments included", async () => {
		const query = { "include-segments": true };
		const stub = new Stub({
			fixture: "vantage/tasks/list_segments.json",
			uri,
			version,
			query,
		});

		await stub.setStub();

		const tasks = await lokaliseVantageApi.tasks().list({ team_id, project_id, ...query });

		expect(tasks.items).toHaveLength(2);
		expect(tasks.count).toBe(2);
		expect(tasks.hasMore).toBe(false);

		const firstTask = getCollectionItem(tasks, 0);
		expect(firstTask).toBeInstanceOf(Task);
		expect(firstTask.taskAssignments[0]?.segments).toHaveLength(2);
		expect(firstTask.taskAssignments[0]?.progress.totalUnits).toBe(2);

		const pendingSegment = firstTask.taskAssignments[0]?.segments[0];
		expect(pendingSegment).toMatchObject({
			id: "019efe61-6634-74d5-bcb3-6a0a2f090260",
			unitId: "019efe60-81d8-8343-f971-64172252469f",
			status: "pending",
			createdAt: "2026-06-25T10:44:16.570Z",
			completedAt: null,
		});

		const secondTask = getCollectionItem(tasks, 1);
		expect(secondTask.taskAssignments[0]?.assignees).toHaveLength(3);
		expect(secondTask.taskAssignments[0]?.progress).toEqual({
			completedUnits: 1,
			totalUnits: 2,
			completedWords: 5,
			totalWords: 20,
		});
		expect(secondTask.taskAssignments[0]?.segments).toHaveLength(2);

		const completedSegment = secondTask.taskAssignments[0]?.segments[1];
		expect(completedSegment?.status).toBe("completed");
		expect(completedSegment?.completedAt).toBe("2026-03-26T11:19:18.414Z");
	});
});
