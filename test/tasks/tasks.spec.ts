import { LokaliseApi, Stub, expect } from "../setup.js";

describe("Tasks", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const projectId = "803826145ba90b42d5d860.46800099";
  const taskId = 21659;
  const newTaskId = 1927993;

  it("lists", async function () {
    const stub = new Stub({
      fixture: "tasks/list.json",
      uri: `projects/${projectId}/tasks`,
      respHeaders: {
        "x-pagination-total-count": "3",
        "x-pagination-page": "1",
        "x-pagination-limit": "500",
        "x-pagination-page-count": "1",
      },
    });

    await stub.setStub();

    const tasks = await lokaliseApi.tasks().list({
      project_id: projectId,
    });

    expect(tasks.items[0].task_id).to.eq(taskId);
  });

  it("lists and paginates", async function () {
    const params = {
      page: 2,
      limit: 2,
    };

    const stub = new Stub({
      fixture: "tasks/list_pagination.json",
      uri: `projects/${projectId}/tasks`,
      query: params,
      respHeaders: {
        "x-pagination-total-count": "3",
        "x-pagination-page": "2",
        "x-pagination-limit": "2",
        "x-pagination-page-count": "2",
      },
    });

    await stub.setStub();

    const tasks = await lokaliseApi.tasks().list({
      project_id: projectId,
      ...params,
    });

    expect(tasks.items[0].task_id).to.eq(10001);
    expect(tasks.totalResults).to.eq(3);
    expect(tasks.totalPages).to.eq(2);
    expect(tasks.resultsPerPage).to.eq(2);
    expect(tasks.currentPage).to.eq(2);
  });

  it("retrieves", async function () {
    const stub = new Stub({
      fixture: "tasks/retrieve.json",
      uri: `projects/${projectId}/tasks/${taskId}`,
    });

    await stub.setStub();

    const task = await lokaliseApi.tasks().get(taskId, {
      project_id: projectId,
    });

    expect(task.task_id).to.eq(taskId);
    expect(task.title).to.eq("demo task");
    expect(task.can_be_parent).be.false;
    expect(task.task_type).to.eq("translation");
    expect(task.parent_task_id).to.be.null;
    expect(task.closing_tags).to.have.lengthOf(0);
    expect(task.description).to.eq("");
    expect(task.status).to.eq("completed");
    expect(task.progress).to.eq(0);
    expect(task.due_date).to.be.null;
    expect(task.due_date_timestamp).to.be.null;
    expect(task.keys_count).to.eq(1);
    expect(task.words_count).to.eq(2);
    expect(task.created_at).to.eq("2019-07-31 16:16:00 (Etc/UTC)");
    expect(task.created_at_timestamp).to.eq(1564589760);
    expect(task.created_by).to.eq(20181);
    expect(task.created_by_email).to.eq("bodrovis@protonmail.com");
    expect(task.source_language_iso).to.eq("en");
    expect(task.languages[0].language_iso).to.eq("fr");
    expect(task.auto_close_languages).to.be.true;
    expect(task.auto_close_task).to.be.true;
    expect(task.auto_close_items).to.be.true;
    expect(task.completed_at).to.eq("2019-10-01 11:09:04 (Etc/UTC)");
    expect(task.completed_at_timestamp).to.eq(1569928144);
    expect(task.completed_by).to.eq(20181);
    expect(task.completed_by_email).to.eq("bodrovis@protonmail.com");
    expect(task.do_lock_translations).to.be.false;
    expect(task.custom_translation_status_ids).to.have.lengthOf(0);
  });

  it("creates", async function () {
    const params = {
      title: "node task",
      keys: [378217831],
      languages: [
        {
          language_iso: "en",
          users: [20181],
        },
      ],
    };

    const stub = new Stub({
      fixture: "tasks/create.json",
      uri: `projects/${projectId}/tasks`,
      body: params,
      method: "POST",
    });

    await stub.setStub();

    const task = await lokaliseApi.tasks().create(params, {
      project_id: projectId,
    });

    expect(task.task_id).to.eq(newTaskId);
    expect(task.title).to.eq("node task");
    expect(task.languages[0].language_iso).to.eq("en");
  });

  it("updates", async function () {
    const params = { title: "node updated" };

    const stub = new Stub({
      fixture: "tasks/update.json",
      uri: `projects/${projectId}/tasks/${newTaskId}`,
      body: params,
      method: "PUT",
    });

    await stub.setStub();

    const task = await lokaliseApi.tasks().update(newTaskId, params, {
      project_id: projectId,
    });

    expect(task.title).to.eq(params.title);
  });

  it("deletes", async function () {
    const stub = new Stub({
      fixture: "tasks/delete.json",
      uri: `projects/${projectId}/tasks/${newTaskId}`,
      method: "DELETE",
    });

    await stub.setStub();

    const response = await lokaliseApi.tasks().delete(newTaskId, {
      project_id: projectId,
    });

    expect(response.project_id).to.eq(projectId);
    expect(response.task_deleted).to.be.true;
    expect(response.branch).to.eq("master");
  });
});
