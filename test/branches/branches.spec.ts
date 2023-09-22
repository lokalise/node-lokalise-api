import { LokaliseApi, Stub, expect } from "../setup.js";

describe("Branches", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const projectId = "803826145ba90b42d5d860.46800099";
  const branchId = 41284;

  it("lists", async function () {
    const stub = new Stub({
      fixture: "branches/list.json",
      uri: `projects/${projectId}/branches`,
      respHeaders: {
        "x-pagination-total-count": "1",
        "x-pagination-page": "1",
        "x-pagination-limit": "500",
        "x-pagination-page-count": "1",
      },
    });

    await stub.setStub();

    const branches = await lokaliseApi.branches().list({
      project_id: projectId,
    });

    expect(branches.items[0].branch_id).to.eq(14699);
  });

  it("lists and paginates", async function () {
    const params = {
      page: 3,
      limit: 1,
    };

    const stub = new Stub({
      fixture: "branches/list_pagination.json",
      query: params,
      uri: `projects/${projectId}/branches`,
      respHeaders: {
        "x-pagination-total-count": "5",
        "x-pagination-page": "3",
        "x-pagination-limit": "1",
        "x-pagination-page-count": "5",
      },
    });

    await stub.setStub();

    const branches = await lokaliseApi.branches().list({
      project_id: projectId,
      ...params,
    });

    expect(branches.items[0].name).to.eq("merge-it");
    expect(branches.totalResults).to.eq(5);
    expect(branches.totalPages).to.eq(5);
    expect(branches.resultsPerPage).to.eq(1);
    expect(branches.currentPage).to.eq(3);
    expect(branches.hasNextPage()).to.be.true;
    expect(branches.hasPrevPage()).to.be.true;
    expect(branches.prevPage()).to.eq(2);
    expect(branches.nextPage()).to.eq(4);
  });

  it("retrieves", async function () {
    const stub = new Stub({
      fixture: "branches/retrieve.json",
      uri: `projects/${projectId}/branches/${branchId}`,
    });

    await stub.setStub();

    const branch = await lokaliseApi.branches().get(branchId, {
      project_id: projectId,
    });

    expect(branch.branch_id).to.eq(branchId);
    expect(branch.name).to.eq("hotfix/really-important");
    expect(branch.created_at).to.eq("2019-10-30 13:11:47 (Etc/UTC)");
    expect(branch.created_at_timestamp).to.eq(1572441107);
    expect(branch.created_by).to.eq(20181);
    expect(branch.created_by_email).to.eq("bodrovis@protonmail.com");
  });

  it("creates", async function () {
    const params = {
      name: "hotfix/really-important",
    };

    const stub = new Stub({
      fixture: "branches/create.json",
      uri: `projects/${projectId}/branches`,
      method: "POST",
      body: params,
    });

    await stub.setStub();

    const branch = await lokaliseApi
      .branches()
      .create(params, { project_id: projectId });

    expect(branch.name).to.eq(params.name);
  });

  it("updates", async function () {
    const params = {
      name: "hotfix/not-really-important",
    };

    const stub = new Stub({
      fixture: "branches/update.json",
      uri: `projects/${projectId}/branches/${branchId}`,
      method: "PUT",
      body: params,
    });

    await stub.setStub();

    const branch = await lokaliseApi
      .branches()
      .update(branchId, params, { project_id: projectId });

    expect(branch.name).to.eq(params.name);
  });

  it("merges", async function () {
    const params = {
      force_conflict_resolve_using: "master",
    };

    const branchIdMerge = 344847;

    const stub = new Stub({
      fixture: "branches/merge.json",
      uri: `projects/${projectId}/branches/${branchIdMerge}/merge`,
      method: "POST",
      body: params,
    });

    await stub.setStub();

    const response = await lokaliseApi
      .branches()
      .merge(branchIdMerge, { project_id: projectId }, params);

    expect(response.project_id).to.eq(projectId);
    expect(response.branch_merged).to.eq(true);
    expect(response.branch.branch_id).to.eq(branchIdMerge);
    expect(response.target_branch.branch_id).to.eq(14699);
  });

  it("merges with defaults", async function () {
    const branchIdMerge = 68628;

    const stub = new Stub({
      fixture: "branches/merge_default.json",
      uri: `projects/${projectId}/branches/${branchIdMerge}/merge`,
      method: "POST",
    });

    await stub.setStub();

    const response = await lokaliseApi
      .branches()
      .merge(branchIdMerge, { project_id: projectId });

    expect(response.project_id).to.eq(projectId);
    expect(response.branch_merged).to.eq(true);
    expect(response.branch.branch_id).to.eq(branchIdMerge);
    expect(response.target_branch.branch_id).to.eq(14699);
  });

  it("deletes", async function () {
    const deleteId = 42301;

    const stub = new Stub({
      fixture: "branches/delete.json",
      uri: `projects/${projectId}/branches/${deleteId}`,
      method: "DELETE",
    });

    await stub.setStub();

    const response = await lokaliseApi.branches().delete(deleteId, {
      project_id: projectId,
    });

    expect(response.project_id).to.eq(projectId);
    expect(response.branch_deleted).to.be.true;
  });
});
