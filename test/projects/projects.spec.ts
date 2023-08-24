import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokalisePkg } from "../../src/lokalise/pkg.js";
import { LokaliseApi } from "../../src/lokalise/lokalise_api.js";
import sinon from "sinon";

describe("Projects", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "26981059635185cc13e557.06057938";
  const new_project_id = "580641925d0a726ead2fd7.11048498";

  cassette
    .createTest("list", async () => {
      const projects = await lokaliseApi.projects().list();
      expect(projects.items[0].name).to.eq("Angular");
    })
    .register(this);

  cassette
    .createTest("get no version", async () => {
      sinon.replace(LokalisePkg, "pkgPath", function () {
        return "fake_file_here";
      });

      const project = await lokaliseApi
        .projects()
        .get("2273827860c1e2473eb195.11207948");
      expect(project.name).to.eq("Angular");

      sinon.restore();
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const projects = await lokaliseApi.projects().list({ page: 3, limit: 2 });
      expect(projects.items[0].name).to.eq("Blog");
      expect(projects.totalResults).to.eq(44);
      expect(projects.totalPages).to.eq(22);
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
      const anotherId = "963054665b7c313dd9b323.35886655";
      const project = await lokaliseApi.projects().get(anotherId);

      expect(project.project_id).to.equal(anotherId);
      expect(project.project_type).to.equal("localization_files");
      expect(project.name).to.equal("Sample Project");
      expect(project.description).to.include("Lokalise sample project");
      expect(project.created_at).to.equal("2018-08-21 13:35:25 (Etc/UTC)");
      expect(project.created_at_timestamp).to.equal(1534858525);
      expect(project.created_by).to.equal(20181);
      expect(project.created_by_email).to.equal("bodrovis@protonmail.com");
      expect(project.team_id).to.equal(176692);
      expect(project.base_language_id).to.equal(640);
      expect(project.base_language_iso).to.equal("en");
      expect(project.settings.per_platform_key_names).to.be.false;
      expect(project.statistics.team).to.equal(5);
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const project = await lokaliseApi.projects().update(project_id, {
        name: "Node updated",
        description: "Description updated",
      });

      expect(project.project_id).to.equal(project_id);
      expect(project.name).to.equal("Node updated");
      expect(project.description).to.equal("Description updated");
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
      const project_to_delete = "8804705664e7542ba911b6.70249100";

      const response = await lokaliseApi.projects().delete(project_to_delete);
      expect(response.project_id).to.be.equal(project_to_delete);
      expect(response.project_deleted).to.be.true;
    })
    .register(this);
});
