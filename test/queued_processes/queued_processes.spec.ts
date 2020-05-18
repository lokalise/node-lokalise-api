require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise";

describe("QueuedProcesses", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "803826145ba90b42d5d860.46800099";
  const process_id = "c23eb693ff46cd9a78310132dfbc6a42c93b0fc2";

  cassette
    .createTest("list", async () => {
      const processes = await lokaliseApi.queuedProcesses.list({
        project_id: project_id,
      });

      expect(processes.length).to.eq(9);
      expect(processes[0].process_id).to.eq(
        "3b943469e6b3e324b5bdad639b122a623e6e7a1a"
      );
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const process = await lokaliseApi.queuedProcesses.get(process_id, {
        project_id: project_id,
      });

      expect(process.process_id).to.eq(process_id);
      expect(process.type).to.eq("file-import");
      expect(process.status).to.eq("finished");
      expect(process.message).to.eq("");
      expect(process.created_by).to.eq(20181);
      expect(process.created_by_email).to.eq("bodrovis@protonmail.com");
      expect(process.created_at).to.eq("2020-05-15 11:16:48 (Etc/UTC)");
      expect(process.created_at_timestamp).to.eq(1589541408);
      expect(process.details["files"].length).to.eq(1);
      const file = process.details["files"][0];
      expect(file.name_original).to.eq("test_async.json");
      expect(file.word_count_total).to.eq(3);
      expect(file.status).to.eq("finished");
    })
    .register(this);
});
