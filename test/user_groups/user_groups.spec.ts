import type { UserGroupParams } from "../../src/main.js";
import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("UserGroups", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const teamId = 176692;
	const groupId = 7561;
	const newGroupId = 10150;
	const userId = 20181;
	const projectId = "803826145ba90b42d5d860.46800099";

	it("lists", async () => {
		const stub = new Stub({
			fixture: "user_groups/list.json",
			uri: `teams/${teamId}/groups`,
			respHeaders: {
				"x-pagination-total-count": "2",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const user_groups = await lokaliseApi.userGroups().list({
			team_id: teamId,
		});

		expect(user_groups.items[1].group_id).to.eq(groupId);
		expect(user_groups.totalResults).to.eq(2);
		expect(user_groups.currentPage).to.eq(1);
	});

	it("lists and paginates", async () => {
		const params = {
			page: 2,
			limit: 2,
		};

		const stub = new Stub({
			fixture: "user_groups/list_pagination.json",
			uri: `teams/${teamId}/groups`,
			query: params,
			respHeaders: {
				"x-pagination-total-count": "4",
				"x-pagination-page": "2",
				"x-pagination-limit": "2",
				"x-pagination-page-count": "2",
			},
		});

		await stub.setStub();

		const user_groups = await lokaliseApi.userGroups().list({
			team_id: teamId,
			...params,
		});

		expect(user_groups.items[0].group_id).to.eq(2500);
		expect(user_groups.items[0].role_id).to.eq(5);
		expect(user_groups.items[1].role_id).to.eq(null);
		expect(user_groups.totalResults).to.eq(4);
		expect(user_groups.totalPages).to.eq(2);
		expect(user_groups.resultsPerPage).to.eq(2);
		expect(user_groups.currentPage).to.eq(2);
	});

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "user_groups/retrieve.json",
			uri: `teams/${teamId}/groups/${groupId}`,
		});

		await stub.setStub();

		const user_group = await lokaliseApi.userGroups().get(groupId, {
			team_id: teamId,
		});

		expect(user_group.group_id).to.eq(groupId);
		expect(user_group.name).to.eq("Restricted");
		expect(user_group.permissions.is_admin).to.be.false;
		expect(user_group.permissions.is_reviewer).to.be.true;

		const languages = user_group.permissions.languages[1];
		expect(languages.is_writable).to.be.true;
		expect(languages.lang_id).to.eq(910);
		expect(languages.lang_iso).to.eq("ak");
		expect(languages.lang_name).to.eq("Akan");

		expect(user_group.created_at).to.eq("2022-08-01 14:16:44 (Etc/UTC)");
		expect(user_group.created_at_timestamp).to.eq(1659363404);
		expect(user_group.team_id).to.eq(teamId);
		expect(user_group.projects).to.have.lengthOf(0);
		expect(user_group.members).to.include(34051);
		expect(user_group.role_id).to.eq(5);
	});

	it("creates", async () => {
		const params: UserGroupParams = {
			name: "Node2",
			is_reviewer: false,
			is_admin: true,
			admin_rights: ["upload"],
		};

		const stub = new Stub({
			fixture: "user_groups/create.json",
			uri: `teams/${teamId}/groups`,
			body: params,
			method: "POST",
		});

		await stub.setStub();

		const user_group = await lokaliseApi.userGroups().create(params, {
			team_id: teamId,
		});

		expect(user_group.group_id).to.eq(newGroupId);
		expect(user_group.name).to.eq("Node2");
		expect(user_group.permissions.is_admin).to.be.true;
	});

	it("updates", async () => {
		const params: UserGroupParams = {
			name: "Node updated2",
			is_reviewer: false,
			is_admin: true,
			admin_rights: ["upload"],
		};

		const stub = new Stub({
			fixture: "user_groups/update.json",
			uri: `teams/${teamId}/groups/${newGroupId}`,
			body: params,
			method: "PUT",
		});

		await stub.setStub();

		const user_group = await lokaliseApi
			.userGroups()
			.update(newGroupId, params, {
				team_id: teamId,
			});

		expect(user_group.group_id).to.eq(newGroupId);
		expect(user_group.name).to.eq("Node updated2");
		expect(user_group.permissions.is_admin).to.be.true;
	});

	it("adds projects to groups", async () => {
		const params = [projectId];

		const stub = new Stub({
			fixture: "user_groups/add_project.json",
			uri: `teams/${teamId}/groups/${newGroupId}/projects/add`,
			body: { projects: params },
			method: "PUT",
		});

		await stub.setStub();

		const user_group = await lokaliseApi
			.userGroups()
			.add_projects_to_group(teamId, newGroupId, params);

		expect(user_group.group_id).to.eq(newGroupId);
		expect(user_group.projects).to.include(projectId);
	});

	it("removes projects from groups", async () => {
		const params = [projectId];

		const stub = new Stub({
			fixture: "user_groups/remove_project.json",
			uri: `teams/${teamId}/groups/${newGroupId}/projects/remove`,
			body: { projects: params },
			method: "PUT",
		});

		await stub.setStub();

		const user_group = await lokaliseApi
			.userGroups()
			.remove_projects_from_group(teamId, newGroupId, params);

		expect(user_group.group_id).to.eq(newGroupId);
		expect(user_group.projects).not.to.include(projectId);
	});

	it("adds members to groups", async () => {
		const params = [userId];

		const stub = new Stub({
			fixture: "user_groups/add_member.json",
			uri: `teams/${teamId}/groups/${newGroupId}/members/add`,
			body: { users: params },
			method: "PUT",
		});

		await stub.setStub();

		const user_group = await lokaliseApi
			.userGroups()
			.add_members_to_group(teamId, newGroupId, params);

		expect(user_group.group_id).to.eq(newGroupId);
		expect(user_group.members).to.include(userId);
	});

	it("remove members from groups", async () => {
		const params = [userId];

		const stub = new Stub({
			fixture: "user_groups/remove_member.json",
			uri: `teams/${teamId}/groups/${newGroupId}/members/remove`,
			body: { users: params },
			method: "PUT",
		});

		await stub.setStub();

		const user_group = await lokaliseApi
			.userGroups()
			.remove_members_from_group(teamId, newGroupId, params);

		expect(user_group.group_id).to.eq(newGroupId);
		expect(user_group.members).not.to.include(userId);
	});

	it("deletes", async () => {
		const stub = new Stub({
			fixture: "user_groups/delete.json",
			uri: `teams/${teamId}/groups/${newGroupId}`,
			method: "DELETE",
		});

		await stub.setStub();

		const response = await lokaliseApi
			.userGroups()
			.delete(newGroupId, { team_id: teamId });

		expect(response.team_id).to.eq(teamId);
		expect(response.group_deleted).to.be.true;
	});
});
