require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise";

describe("Projects", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "803826145ba90b42d5d860.46800099";
  const new_project_id = "580641925d0a726ead2fd7.11048498";

  cassette
    .createTest("list", async () => {
      const projects = await lokaliseApi.projects.list();
      expect(projects[0].name).to.eq("contrib");
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const projects = await lokaliseApi.projects.list({ page: 3, limit: 2 });
      expect(projects[0].name).to.eq("demo phoenix copy");
      expect(lokaliseApi.projects.totalResults).to.eq(13);
      expect(lokaliseApi.projects.totalPages).to.eq(7);
      expect(lokaliseApi.projects.resultsPerPage).to.eq(2);
      expect(lokaliseApi.projects.currentPage).to.eq(3);
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const project = await lokaliseApi.projects.create({
        name: "Node.js test",
        description: "Test description",
      });

      expect(project.project_id).to.equal(new_project_id);
      expect(project.name).to.equal("Node.js test");
      expect(project.description).to.equal("Test description");
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const project = await lokaliseApi.projects.get(project_id);

      expect(project.project_id).to.equal(project_id);
      expect(project.project_type).to.equal("localization_files");
      expect(project.name).to.equal("demo phoenix");
      expect(project.description).to.equal("");
      expect(project.created_at).to.equal("2018-09-24 16:05:22 (Etc/UTC)");
      expect(project.created_at_timestamp).to.equal(1537805122);
      expect(project.created_by).to.equal(20181);
      expect(project.created_by_email).to.equal("bodrovis@protonmail.com");
      expect(project.team_id).to.equal(176692);
      expect(project.base_language_id).to.equal(640);
      expect(project.base_language_iso).to.equal("en");
      expect(project.settings["per_platform_key_names"]).to.be.false;
      expect(project.statistics["progress_total"]).to.equal(17);
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const project = await lokaliseApi.projects.update(project_id, {
        name: "Demo Phoenix",
        description: "Description Phoenix",
      });

      expect(project.project_id).to.equal(project_id);
      expect(project.name).to.equal("Demo Phoenix");
      expect(project.description).to.equal("Description Phoenix");
    })
    .register(this);

  cassette
    .createTest("empty", async () => {
      const response = await lokaliseApi.projects.empty(new_project_id);

      expect(response.project_id).to.equal(new_project_id);
      expect(response.keys_deleted).to.be.true;
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApi.projects.delete(new_project_id);
      expect(response.project_id).to.be.equal(new_project_id);
      expect(response.project_deleted).to.be.true;
    })
    .register(this);
});
