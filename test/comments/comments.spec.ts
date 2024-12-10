import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("Comments", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const projectId = "803826145ba90b42d5d860.46800099";
	const keyId = 375778480;
	const commentId = 20456339;

	it("lists project comments", async () => {
		const stub = new Stub({
			fixture: "comments/project_comments.json",
			uri: `projects/${projectId}/comments`,
			respHeaders: {
				"x-pagination-total-count": "1",
				"x-pagination-page": "1",
				"x-pagination-limit": "100",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const comments = await lokaliseApi.comments().list_project_comments({
			project_id: projectId,
		});

		expect(comments.items[0].comment_id).to.eq(20421626);
		expect(comments.totalResults).to.eq(1);
	});

	it("lists project comments", async () => {
		const stub = new Stub({
			fixture: "comments/project_comments_malformed.json",
			uri: `projects/${projectId}/comments`,
			respHeaders: {
				"x-pagination-total-count": "1",
				"x-pagination-page": "1",
				"x-pagination-limit": "100",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		try {
			await lokaliseApi.comments().list_project_comments({
				project_id: projectId,
			});
		} catch (e) {
			expect(e.message).toEqual(
				"Expected an array under 'comments' but received: object",
			);
		}
	});

	it("lists project comments", async () => {
		const params = {
			page: 2,
			limit: 2,
		};

		const stub = new Stub({
			fixture: "comments/project_comments_paginated.json",
			query: params,
			uri: `projects/${projectId}/comments`,
			respHeaders: {
				"x-pagination-total-count": "3",
				"x-pagination-page": "2",
				"x-pagination-limit": "2",
				"x-pagination-page-count": "2",
			},
		});

		await stub.setStub();

		const comments = await lokaliseApi.comments().list_project_comments({
			project_id: projectId,
			...params,
		});

		expect(comments.items[0].comment_id).to.eq(20456340);
		expect(comments.resultsPerPage).to.eq(2);
		expect(comments.currentPage).to.eq(2);
		expect(comments.hasNextPage()).to.eq(false);
		expect(comments.prevPage()).to.eq(1);
	});

	it("lists key comments", async () => {
		const stub = new Stub({
			fixture: "comments/key_comments.json",
			uri: `projects/${projectId}/keys/${keyId}/comments`,
			respHeaders: {
				"x-pagination-total-count": "2",
				"x-pagination-page": "1",
				"x-pagination-limit": "100",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const comments = await lokaliseApi.comments().list({
			project_id: projectId,
			key_id: keyId,
		});

		expect(comments.items[0].comment_id).to.eq(commentId);
		expect(comments.items[0].key_id).to.eq(keyId);
		expect(comments.resultsPerPage).to.eq(100);
	});

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "comments/key_comment.json",
			uri: `projects/${projectId}/keys/${keyId}/comments/${commentId}`,
		});

		await stub.setStub();

		const comment = await lokaliseApi.comments().get(commentId, {
			project_id: projectId,
			key_id: keyId,
		});

		expect(comment.comment_id).to.eq(commentId);
		expect(comment.key_id).to.eq(keyId);
		expect(comment.comment).to.eq("<p>Demo 1</p>");
		expect(comment.added_by).to.eq(20181);
		expect(comment.added_by_email).to.eq("bodrovis@protonmail.com");
		expect(comment.added_at).to.eq("2023-09-21 10:08:08 (Etc/UTC)");
		expect(comment.added_at_timestamp).to.eq(1695290888);
	});

	it("creates", async () => {
		const params = [
			{ comment: "Project comment 1" },
			{ comment: "Project comment 2" },
		];

		const stub = new Stub({
			fixture: "comments/create_key_comments.json",
			uri: `projects/${projectId}/keys/${keyId}/comments`,
			method: "POST",
			body: { comments: params },
		});

		await stub.setStub();

		const comments = await lokaliseApi
			.comments()
			.create(params, { project_id: projectId, key_id: keyId });

		expect(comments[0].comment).to.eq(params[0].comment);
		expect(comments[1].comment).to.eq(params[1].comment);
	});

	it("creates single comment", async () => {
		const params = { comment: "Project comment single" };

		const stub = new Stub({
			fixture: "comments/create_key_comment.json",
			uri: `projects/${projectId}/keys/${keyId}/comments`,
			method: "POST",
			body: { comments: [params] },
		});

		await stub.setStub();

		const comments = await lokaliseApi
			.comments()
			.create(params, { project_id: projectId, key_id: keyId });

		expect(comments[0].comment).to.eq(params.comment);
	});

	it("deletes", async () => {
		const stub = new Stub({
			fixture: "comments/delete_key_comment.json",
			uri: `projects/${projectId}/keys/${keyId}/comments/${commentId}`,
			method: "DELETE",
		});

		await stub.setStub();

		const response = await lokaliseApi.comments().delete(commentId, {
			project_id: projectId,
			key_id: keyId,
		});

		expect(response.project_id).to.eq(projectId);
		expect(response.comment_deleted).to.be.true;
		expect(response.branch).to.be.eq("master");
	});
});
