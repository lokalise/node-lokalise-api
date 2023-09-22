import { LokaliseApi, Stub, expect } from "../setup.js";

describe("TranslationStatuses", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const projectId = "803826145ba90b42d5d860.46800099";
  const statusId = 16064;
  const newStatusId = 16065;

  it("lists", async function () {
    const stub = new Stub({
      fixture: "translation_statuses/list.json",
      uri: `projects/${projectId}/custom_translation_statuses`,
      respHeaders: {
        "x-pagination-total-count": "3",
        "x-pagination-page": "1",
        "x-pagination-limit": "500",
        "x-pagination-page-count": "1",
      },
    });

    await stub.setStub();

    const statuses = await lokaliseApi.translationStatuses().list({
      project_id: projectId,
    });

    expect(statuses.items[0].title).to.eq("new");
  });

  it("lists and paginates", async function () {
    const params = {
      page: 2,
      limit: 2,
    };

    const stub = new Stub({
      fixture: "translation_statuses/list_pagination.json",
      uri: `projects/${projectId}/custom_translation_statuses`,
      query: params,
      respHeaders: {
        "x-pagination-total-count": "3",
        "x-pagination-page": "2",
        "x-pagination-limit": "2",
        "x-pagination-page-count": "2",
      },
    });

    await stub.setStub();

    const statuses = await lokaliseApi.translationStatuses().list({
      project_id: projectId,
      ...params,
    });

    expect(statuses.items[0].title).to.eq("tested");
    expect(statuses.totalResults).to.eq(3);
    expect(statuses.totalPages).to.eq(2);
    expect(statuses.resultsPerPage).to.eq(2);
    expect(statuses.currentPage).to.eq(2);
  });

  it("retrieves", async function () {
    const stub = new Stub({
      fixture: "translation_statuses/retrieve.json",
      uri: `projects/${projectId}/custom_translation_statuses/${statusId}`,
    });

    await stub.setStub();

    const status = await lokaliseApi.translationStatuses().get(statusId, {
      project_id: projectId,
    });

    expect(status.status_id).to.eq(statusId);
    expect(status.title).to.eq("new");
    expect(status.color).to.eq("#344563");
  });

  it("creates", async function () {
    const params = { title: "node", color: "#344563" };

    const stub = new Stub({
      fixture: "translation_statuses/create.json",
      uri: `projects/${projectId}/custom_translation_statuses`,
      body: params,
      method: "POST",
    });

    await stub.setStub();

    const status = await lokaliseApi.translationStatuses().create(params, {
      project_id: projectId,
    });

    expect(status.status_id).to.eq(newStatusId);
    expect(status.title).to.eq("node");
    expect(status.color).to.eq("#344563");
  });

  it("updates", async function () {
    const params = { title: "node updated" };

    const stub = new Stub({
      fixture: "translation_statuses/update.json",
      uri: `projects/${projectId}/custom_translation_statuses/${newStatusId}`,
      body: params,
      method: "PUT",
    });

    await stub.setStub();

    const status = await lokaliseApi
      .translationStatuses()
      .update(newStatusId, params, {
        project_id: projectId,
      });

    expect(status.title).to.eq("node updated");
  });

  it("deletes", async function () {
    const stub = new Stub({
      fixture: "translation_statuses/delete.json",
      uri: `projects/${projectId}/custom_translation_statuses/${newStatusId}`,
      method: "DELETE",
    });

    await stub.setStub();

    const response = await lokaliseApi
      .translationStatuses()
      .delete(newStatusId, {
        project_id: projectId,
      });

    expect(response.project_id).to.eq(projectId);
    expect(response.custom_translation_status_deleted).to.be.true;
    expect(response.branch).to.eq("master");
  });

  it("lists available colors", async function () {
    const stub = new Stub({
      fixture: "translation_statuses/colors.json",
      uri: `projects/${projectId}/custom_translation_statuses/colors`,
      method: "GET",
    });

    await stub.setStub();

    const colors_data = await lokaliseApi
      .translationStatuses()
      .available_colors({
        project_id: projectId,
      });

    expect(colors_data.colors).to.include("#f2d600");
  });
});
