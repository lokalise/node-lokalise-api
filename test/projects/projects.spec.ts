import { LokaliseApi, Stub, expect } from "../setup.js";
import { LokalisePkg } from "../../src/lokalise/pkg.js";
import sinon from "sinon";

describe("Projects", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const projectId = "803826145ba90b42d5d860.46800099";
  const newProjectId = "43820238650c56462a27f0.61419394";

  it("lists", async function () {
    const stub = new Stub({
      fixture: "projects/list.json",
      uri: `projects`,
      respHeaders: {
        "x-pagination-total-count": "2",
        "x-pagination-page": "1",
        "x-pagination-limit": "500",
        "x-pagination-page-count": "1",
      },
    });

    await stub.setStub();

    const projects = await lokaliseApi.projects().list();

    expect(projects.items[0].name).to.eq("Angular");
  });

  it("lists and paginates", async function () {
    const params = {
      page: 2,
      limit: 1,
    };

    const stub = new Stub({
      fixture: "projects/list_pagination.json",
      uri: `projects`,
      query: params,
      respHeaders: {
        "x-pagination-total-count": "2",
        "x-pagination-page": "2",
        "x-pagination-limit": "1",
        "x-pagination-page-count": "2",
      },
    });

    await stub.setStub();

    const projects = await lokaliseApi.projects().list(params);

    expect(projects.items[0].name).to.eq("Blog");
    expect(projects.totalResults).to.eq(2);
    expect(projects.totalPages).to.eq(2);
    expect(projects.resultsPerPage).to.eq(1);
    expect(projects.currentPage).to.eq(2);
  });

  it("retrieves", async function () {
    const stub = new Stub({
      fixture: "projects/retrieve.json",
      uri: `projects/${projectId}`,
    });

    await stub.setStub();

    const project = await lokaliseApi.projects().get(projectId);

    expect(project.name).to.eq("Demo Phoenix");
    expect(project.project_id).to.equal(projectId);
    expect(project.project_type).to.equal("localization_files");
    expect(project.description).to.include("Description Phoenix");
    expect(project.created_at).to.equal("2018-09-24 16:05:22 (Etc/UTC)");
    expect(project.created_at_timestamp).to.equal(1537805122);
    expect(project.created_by).to.equal(20181);
    expect(project.created_by_email).to.equal("bodrovis@protonmail.com");
    expect(project.team_id).to.equal(176692);
    expect(project.base_language_id).to.equal(640);
    expect(project.base_language_iso).to.equal("en");
    expect(project.settings.per_platform_key_names).to.be.true;
    expect(project.statistics.progress_total).to.equal(32);
  });

  it("retrieves with no version", async function () {
    sinon.replace(LokalisePkg, "pkgPath", function () {
      return "fake_file_here";
    });

    const stub = new Stub({
      fixture: "projects/retrieve_no_version.json",
      uri: `projects/${projectId}`,
      reqHeaders: {
        "User-Agent": `node-lokalise-api/unknown`,
      },
    });

    await stub.setStub();

    const project = await lokaliseApi.projects().get(projectId);

    expect(project.name).to.eq("Demo Phoenix");

    sinon.restore();
  });

  it("creates", async function () {
    const params = {
      name: "Node.js test",
      description: "Test description",
    };

    const stub = new Stub({
      fixture: "projects/create.json",
      uri: `projects`,
      method: "POST",
      body: params,
    });

    await stub.setStub();

    const project = await lokaliseApi.projects().create(params);

    expect(project.project_id).to.equal(newProjectId);
    expect(project.name).to.equal("Node.js test");
    expect(project.description).to.equal("Test description");
  });

  it("updates", async function () {
    const params = {
      name: "Node.js updated",
      description: "Test description updated",
    };

    const stub = new Stub({
      fixture: "projects/update.json",
      uri: `projects/${newProjectId}`,
      method: "PUT",
      body: params,
    });

    await stub.setStub();

    const project = await lokaliseApi.projects().update(newProjectId, params);

    expect(project.project_id).to.equal(newProjectId);
    expect(project.name).to.equal(params.name);
    expect(project.description).to.equal(params.description);
  });

  it("empties", async function () {
    const stub = new Stub({
      fixture: "projects/empty.json",
      uri: `projects/${newProjectId}/empty`,
      method: "PUT",
    });

    await stub.setStub();

    const response = await lokaliseApi.projects().empty(newProjectId);

    expect(response.project_id).to.equal(newProjectId);
    expect(response.keys_deleted).to.be.true;
  });

  it("deletes", async function () {
    const stub = new Stub({
      fixture: "projects/delete.json",
      uri: `projects/${newProjectId}`,
      method: "DELETE",
    });

    await stub.setStub();

    const response = await lokaliseApi.projects().delete(newProjectId);

    expect(response.project_id).to.be.equal(newProjectId);
    expect(response.project_deleted).to.be.true;
  });
});
