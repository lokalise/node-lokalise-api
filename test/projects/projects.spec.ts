require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api";

describe("Projects", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "9367803563515cbe23fa19.58441884";
  const new_project_id = "580641925d0a726ead2fd7.11048498";

  cassette
    .createTest("list", async () => {
      const projects = await lokaliseApi.projects().list();
      expect(projects.items[0].name).to.eq("Angular");
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const projects = await lokaliseApi.projects().list({ page: 3, limit: 2 });
      expect(projects.items[0].name).to.eq("Blog");
      expect(projects.totalResults).to.eq(45);
      expect(projects.totalPages).to.eq(23);
      expect(projects.resultsPerPage).to.eq(2);
      expect(projects.currentPage).to.eq(3);
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const project = await lokaliseApi.projects().create({
        name: "Node.js test",
        description: "Test description",
      });

      expect(project.project_id).to.equal(project_id);
      expect(project.name).to.equal("Node.js test");
      expect(project.description).to.equal("Test description");
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const project = await lokaliseApi.projects().get(project_id);

      expect(project.project_id).to.equal(project_id);
      expect(project.project_type).to.equal("localization_files");
      expect(project.name).to.equal("Node.js test");
      expect(project.description).to.equal("Test description");
      expect(project.created_at).to.equal("2022-10-20 14:35:42 (Etc/UTC)");
      expect(project.created_at_timestamp).to.equal(1666276542);
      expect(project.created_by).to.equal(20181);
      expect(project.created_by_email).to.equal("bodrovis@protonmail.com");
      expect(project.team_id).to.equal(176692);
      expect(project.base_language_id).to.equal(640);
      expect(project.base_language_iso).to.equal("en");
      expect(project.settings.per_platform_key_names).to.be.false;
      expect(project.statistics.team).to.equal(2);
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const project = await lokaliseApi.projects().update(project_id, {
        name: "Node updated",
        description: "SDK update",
      });

      expect(project.project_id).to.equal(project_id);
      expect(project.name).to.equal("Node updated");
      expect(project.description).to.equal("SDK update");
    })
    .register(this);

  cassette
    .createTest("empty", async () => {
      const response = await lokaliseApi.projects().empty(new_project_id);

      expect(response.project_id).to.equal(new_project_id);
      expect(response.keys_deleted).to.be.true;
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApi.projects().delete(new_project_id);
      expect(response.project_id).to.be.equal(new_project_id);
      expect(response.project_deleted).to.be.true;
    })
    .register(this);
});
