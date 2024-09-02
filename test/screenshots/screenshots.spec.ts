import type { ApiError } from "../../src/main.js";
import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("Screenshots", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const projectId = "803826145ba90b42d5d860.46800099";
	const screenshotId = 757673;
	const secondScreenshotId = 3527037;
	const data =
		"data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAgCAIAAACw8uBbAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASdEVYdFNvZnR3YXJlAEdyZWVuc2hvdF5VCAUAAALkSURBVGhD7ZnNattAEIDzAO65r+CWtNCrqWUby01SHISVCqMeQujBhda0hlx8co6pDy0Un9pT60AuPRZKUK59APeNOquR5NXoZ7XyOnJgzYeQRrOzu99uJIj2Hjwycnj42PjZ7P1pH8DxSdOafflGIPlArf7u0rsem00Sz6d2uvCuLp7VJVuxvrzb8Od5C0uyAo/12SsxBkS2rcA7sP+0DdLhSOJZyHqvmRc/PPhJL5USavVX46tg5WSXbZO2Yu+abaC9V8Pe81ZHc/do79WgvVeDhPf351M4Xi6+8/AJmuIU9Q7S0TIvHSOaEhTyjtLRcmQ8imhKIPYeSUfL0XkU2QUaxtFy5MzNNomXQGGpHKTfq/fduzBzV7wT0QSSXBXaO4zbnJ+5/96+BpZ9NnoSwYktXWc1GkyMdsM8vhmxu3jJ8uORQIQ9wAo3tplVc94PGmIOX4pLCy5X7hHm+NXWQ/rYPEwtpRbp54x1MhR47w/iU2KC+NHj5EN9vi9/c0FDCGZEXKzJiuNi0F78nLPjId5aL5gbrD1bAFaWr0+ac0MKS4Wt+GQlZHr/1O39PThMAnHypiXgFotE+5fBRg4i3Mz5/Yh7MCXC54fntJfMnHXXE5etAZ8Zkdocb2ErPFdIpneim+elNcjxjgxtB6yxeYq9x+/m58elrHtJy9ncO/6x3qn3adckuhGIT6YzoXcApPhPidTnDD/J5N38/Ji1sJeUHCyF1qI1yM7kg8EAkptAFXnP968mfdRAZPThPJKe6h0er8EjIhwxzgSDyR3nzy32riORhBTfVLyX1By+1IrrETY+qZxsDu9YrL+NzQ4I3qu/ei8i6XDunr7hpad61xRB4N1sdX776uFoWzaRDpB8TUEE3gGn0wXpcCRxzSaIvWu2gfZeDdp7NWjv1aC9V4OEd/19VSFFvevvq2op5F1/X1WO2PvufF9tGOOFdz1zFPzDRGGpcki/V++Fd2Fmxd5bnf90pEGocXtKKgAAAABJRU5ErkJggg==";

	it("lists", async () => {
		const stub = new Stub({
			fixture: "screenshots/list.json",
			uri: `projects/${projectId}/screenshots`,
			respHeaders: {
				"x-pagination-total-count": "2",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const screenshots = await lokaliseApi.screenshots().list({
			project_id: projectId,
		});

		expect(screenshots.items[0].screenshot_id).to.eq(757672);
	});

	it("lists and paginates", async () => {
		const params = {
			page: 2,
			limit: 1,
		};

		const stub = new Stub({
			fixture: "screenshots/list_pagination.json",
			uri: `projects/${projectId}/screenshots`,
			query: params,
			respHeaders: {
				"x-pagination-total-count": "2",
				"x-pagination-page": "2",
				"x-pagination-limit": "1",
				"x-pagination-page-count": "2",
			},
		});

		await stub.setStub();

		const screenshots = await lokaliseApi.screenshots().list({
			project_id: projectId,
			...params,
		});

		expect(screenshots.items[0].screenshot_id).to.eq(screenshotId);
		expect(screenshots.items[0].key_ids).to.include(74166107);
		expect(screenshots.totalResults).to.eq(2);
		expect(screenshots.totalPages).to.eq(2);
		expect(screenshots.resultsPerPage).to.eq(1);
		expect(screenshots.currentPage).to.eq(2);
		expect(screenshots.hasPrevPage()).to.be.true;
		expect(screenshots.prevPage()).to.eq(1);
	});

	it("lists with error", async () => {
		const stub = new Stub({
			fixture: "screenshots/list_error.json",
			uri: `projects//screenshots`,
			status: 404,
			respHeaders: {
				"x-pagination-total-count": "2",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		await lokaliseApi
			.screenshots()
			.list({
				project_id: "",
			})
			.catch((e: ApiError) => {
				expect(e.message).to.eq("Not Found");
				expect(e.code).to.eq(404);
			});
	});

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "screenshots/retrieve.json",
			uri: `projects/${projectId}/screenshots/${screenshotId}`,
		});

		await stub.setStub();

		const screenshot = await lokaliseApi.screenshots().get(screenshotId, {
			project_id: projectId,
		});

		expect(screenshot.screenshot_id).to.eq(screenshotId);
		expect(screenshot.key_ids).to.include(74166107);
		expect(screenshot.title).to.eq("123");
		expect(screenshot.description).to.eq("");
		expect(screenshot.screenshot_tags.length).to.eq(0);
		expect(screenshot.keys[0].key_id).to.eq(74166107);
		expect(screenshot.keys[0].coordinates.height).to.eq(12);
		expect(screenshot.url).to.include("s3.eu-central-1");
		expect(screenshot.width).to.eq(1506);
		expect(screenshot.height).to.eq(411);
		expect(screenshot.created_at).to.eq("2021-03-16 17:55:01 (Etc/UTC)");
		expect(screenshot.created_at_timestamp).to.eq(1615917301);
	});

	it("creates", async () => {
		const params = [
			{
				data: data,
				ocr: false,
				key_ids: [378217831],
				tags: ["onboarding"],
			},
		];

		const stub = new Stub({
			fixture: "screenshots/create.json",
			uri: `projects/${projectId}/screenshots`,
			method: "POST",
			body: { screenshots: params },
		});

		await stub.setStub();

		const screenshots = await lokaliseApi
			.screenshots()
			.create(params, { project_id: projectId });

		expect(screenshots.items[0].screenshot_id).to.eq(secondScreenshotId);
		expect(screenshots.items[0].key_ids).to.include(378217831);
		expect(screenshots.errors).to.be.lengthOf(0);
	});

	it("updates", async () => {
		const params = { title: "node screen", description: "node desc" };

		const stub = new Stub({
			fixture: "screenshots/update.json",
			uri: `projects/${projectId}/screenshots/${secondScreenshotId}`,
			method: "PUT",
			body: params,
		});

		await stub.setStub();

		const screenshot = await lokaliseApi
			.screenshots()
			.update(secondScreenshotId, params, { project_id: projectId });

		expect(screenshot.screenshot_id).to.eq(secondScreenshotId);
		expect(screenshot.title).to.eq("node screen");
		expect(screenshot.description).to.eq("node desc");
	});

	it("deletes", async () => {
		const stub = new Stub({
			fixture: "screenshots/delete.json",
			uri: `projects/${projectId}/screenshots/${secondScreenshotId}`,
			method: "DELETE",
		});

		await stub.setStub();

		const response = await lokaliseApi
			.screenshots()
			.delete(secondScreenshotId, { project_id: projectId });

		expect(response.project_id).to.eq(projectId);
		expect(response.screenshot_deleted).to.be.true;
		expect(response.branch).to.eq("master");
	});
});
