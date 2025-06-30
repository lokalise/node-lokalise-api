import type { Project } from "../../src/main.js";
import { describe, expect, it, LokaliseApi, Stub } from "../setup.js";

describe("Snapshots", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const projectId = "803826145ba90b42d5d860.46800099";
	const snapshotId = 516514;
	const newSnapshotId = 2533466;

	it("lists", async () => {
		const stub = new Stub({
			fixture: "snapshots/list.json",
			uri: `projects/${projectId}/snapshots`,
			respHeaders: {
				"x-pagination-total-count": "1",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const snapshots = await lokaliseApi.snapshots().list({
			project_id: projectId,
		});

		expect(snapshots.items[0].snapshot_id).to.eq(27882);
		expect(snapshots.items[1].snapshot_id).to.eq(243330);
	});

	it("lists and paginates", async () => {
		const params = {
			page: 2,
			limit: 2,
		};

		const stub = new Stub({
			fixture: "snapshots/list_pagination.json",
			uri: `projects/${projectId}/snapshots`,
			query: params,
			respHeaders: {
				"x-pagination-total-count": "5",
				"x-pagination-page": "2",
				"x-pagination-limit": "2",
				"x-pagination-page-count": "3",
			},
		});

		await stub.setStub();

		const snapshots = await lokaliseApi.snapshots().list({
			project_id: projectId,
			...params,
		});

		expect(snapshots.items[0].snapshot_id).to.eq(snapshotId);
		expect(snapshots.totalResults).to.eq(5);
		expect(snapshots.totalPages).to.eq(3);
		expect(snapshots.resultsPerPage).to.eq(2);
		expect(snapshots.currentPage).to.eq(2);
	});

	it("creates", async () => {
		const params = { title: "API snapshot" };

		const stub = new Stub({
			fixture: "snapshots/create.json",
			uri: `projects/${projectId}/snapshots`,
			body: params,
			method: "POST",
		});

		await stub.setStub();

		const snapshot = await lokaliseApi.snapshots().create(params, {
			project_id: projectId,
		});

		expect(snapshot.snapshot_id).to.eq(newSnapshotId);
		expect(snapshot.title).to.eq("API snapshot");
		expect(snapshot.created_by).to.eq(20181);
		expect(snapshot.created_by_email).to.eq("bodrovis@protonmail.com");
		expect(snapshot.created_at).to.eq("2023-09-22 10:44:14 (Etc/UTC)");
		expect(snapshot.created_at_timestamp).to.eq(1695379454);
	});

	it("restores", async () => {
		const stub = new Stub({
			fixture: "snapshots/restore.json",
			uri: `projects/${projectId}/snapshots/${newSnapshotId}`,
			method: "POST",
		});

		await stub.setStub();

		const project: Project = await lokaliseApi
			.snapshots()
			.restore(newSnapshotId, {
				project_id: projectId,
			});

		expect(project.project_id).not.to.eq(projectId);
		expect(project.name).to.eq("Demo Phoenix copy");
	});

	it("deletes", async () => {
		const stub = new Stub({
			fixture: "snapshots/delete.json",
			uri: `projects/${projectId}/snapshots/${newSnapshotId}`,
			method: "DELETE",
		});

		await stub.setStub();

		const response = await lokaliseApi.snapshots().delete(newSnapshotId, {
			project_id: projectId,
		});

		expect(response.project_id).to.eq(projectId);
		expect(response.snapshot_deleted).to.be.true;
		expect(response.branch).to.eq("master");
	});
});
