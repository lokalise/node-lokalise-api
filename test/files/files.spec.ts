require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api";

describe("Files", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "803826145ba90b42d5d860.46800099";
  const process_id = "d217930e61f717a21f257372e7662a054f822d8e";

  cassette
    .createTest("list", async () => {
      const files = await lokaliseApi.files().list({ project_id: project_id });
      const file = files.items[0];

      expect(file.file_id).to.eq(81446);
      expect(file.filename).to.eq("%LANG_ISO%.yml");
      expect(file.key_count).to.eq(66);
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const files = await lokaliseApi.files().list({
        project_id: project_id,
        page: 2,
        limit: 1,
      });

      expect(files.items[0].filename).to.eq("my_filename.json");
      expect(files.totalResults).to.eq(5);
      expect(files.totalPages).to.eq(5);
      expect(files.resultsPerPage).to.eq(1);
      expect(files.currentPage).to.eq(2);
    })
    .register(this);

  cassette
    .createTest("upload", async () => {
      const data =
        "ewogICAgImZydWl0IjogIkFwcGxlIiwKICAgICJzaXplIjogIkxhcmdlIiwKICAgICJjb2xvciI6ICJSZWQiCn0=";
      const process = await lokaliseApi.files().upload(project_id, {
        data: data,
        filename: "test_async.json",
        lang_iso: "en",
      });
      expect(process.process_id).to.eq(process_id);
      expect(process.type).to.eq("file-import");
      expect(process.status).to.eq("queued");
      expect(process.message).to.eq("");
      expect(process.created_by).to.eq(20181);
      expect(process.created_by_email).to.eq("bodrovis@protonmail.com");
      expect(process.created_at).to.eq("2020-07-02 15:13:45 (Etc/UTC)");
      expect(process.created_at_timestamp).to.eq(1593702825);
    })
    .register(this);

  cassette
    .createTest("upload without automations", async () => {
      const data =
        "ewogICAgImZydWl0IjogIkFwcGxlIiwKICAgICJzaXplIjogIkxhcmdlIiwKICAgICJjb2xvciI6ICJSZWQiCn0=";
      const process = await lokaliseApi.files().upload(project_id, {
        data: data,
        filename: "test_async.json",
        lang_iso: "en",
        use_automations: false,
      });

      expect(process.type).to.eq("file-import");
      expect(process.status).to.eq("queued");
    })
    .register(this);

  cassette
    .createTest("upload asynchronous re-check", async () => {
      const process = await lokaliseApi.queuedProcesses().get(process_id, {
        project_id: project_id,
      });

      expect(process.process_id).to.eq(process_id);
      expect(process.status).to.eq("finished");
      expect(process.details["files"].length).to.eq(1);
      const file = process.details["files"][0];
      expect(file.name_original).to.eq("test_async.json");
      expect(file.word_count_total).to.eq(3);
      expect(file.status).to.eq("finished");
    })
    .register(this);

  cassette
    .createTest("download", async () => {
      const response = await lokaliseApi.files().download(project_id, {
        format: "json",
        original_filenames: true,
      });

      expect(response.project_id).to.eq(project_id);
      expect(response.bundle_url).to.include("s3-eu-west-1.amazonaws.com");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const file_id = "1163964";
      const docs_project_id = "507504186242fccb32f015.15252556";
      const response = await lokaliseApi
        .files()
        .delete(file_id, { project_id: docs_project_id });

      expect(response.project_id).to.eq(docs_project_id);
      expect(response.file_deleted).to.be.true;
    })
    .register(this);
});
