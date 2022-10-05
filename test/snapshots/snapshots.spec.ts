import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api.js";

describe("Snapshots", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "803826145ba90b42d5d860.46800099";
  const snapshot_id = 27882;
  const new_snapshot_id = 89351;

  cassette
    .createTest("list", async () => {
      const snapshots = await lokaliseApi.snapshots().list({
        project_id: project_id,
        page: 1,
        limit: 1,
      });

      expect(snapshots.items[0].snapshot_id).to.eq(snapshot_id);
      expect(snapshots.totalResults).to.eq(1);
      expect(snapshots.totalPages).to.eq(1);
      expect(snapshots.resultsPerPage).to.eq(1);
      expect(snapshots.currentPage).to.eq(1);
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const snapshot = await lokaliseApi
        .snapshots()
        .create({ title: "API snapshot" }, { project_id: project_id });

      expect(snapshot.snapshot_id).to.eq(new_snapshot_id);
      expect(snapshot.title).to.eq("API snapshot");
      expect(snapshot.created_by).to.eq(20181);
      expect(snapshot.created_by_email).to.eq("bodrovis@protonmail.com");
      expect(snapshot.created_at).to.eq("2019-06-20 15:01:49 (Etc/UTC)");
      expect(snapshot.created_at_timestamp).to.eq(1561042909);
    })
    .register(this);

  cassette
    .createTest("restore", async () => {
      const response = await lokaliseApi.snapshots().restore(new_snapshot_id, {
        project_id: project_id,
      });

      expect(response.project_id).to.eq("531138705d0ba0c18f5b43.63503311");
      expect(response.name).to.eq("Demo Phoenix copy");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApi.snapshots().delete(new_snapshot_id, {
        project_id: project_id,
      });

      expect(response.project_id).to.eq(project_id);
      expect(response.snapshot_deleted).to.be.true;
    })
    .register(this);
});
