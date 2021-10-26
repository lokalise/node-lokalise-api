import { ApiError } from "../../src/interfaces/api_error";

require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api";

describe("Branches", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "803826145ba90b42d5d860.46800099";
  const branch_id = 41284;

  cassette
    .createTest("error", async () => {
      await lokaliseApi
        .branches()
        .create(
          {
            name: "hotfix/really-important",
          },
          { project_id: "803" }
        )
        .catch((e: ApiError) => {
          expect(e.code).to.equal(401);
        });
    })
    .register(this);

  cassette
    .createTest("error 500", async () => {
      await lokaliseApi
        .branches()
        .create(
          {
            name: "hotfix/really-important",
          },
          { project_id: "803" }
        )
        .catch((e: ApiError) => {
          expect(e.message).to.include("Something very bad has happened");
        });
    })
    .register(this);

  cassette
    .createTest("list", async () => {
      const branches = await lokaliseApi.branches().list({
        project_id: project_id,
      });

      expect(branches.items[0].branch_id).to.eq(branch_id);
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const branches = await lokaliseApi.branches().list({
        project_id: project_id,
        page: 3,
        limit: 1,
      });

      expect(branches.items[0].name).to.eq("merge-me");
      expect(branches.totalResults).to.eq(3);
      expect(branches.totalPages).to.eq(3);
      expect(branches.resultsPerPage).to.eq(1);
      expect(branches.currentPage).to.eq(3);
      expect(branches.hasNextPage()).to.be.false;
      expect(branches.hasPrevPage()).to.be.true;
      expect(branches.prevPage()).to.eq(2);
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const branch = await lokaliseApi.branches().get(branch_id, {
        project_id: project_id,
      });

      expect(branch.branch_id).to.eq(branch_id);
      expect(branch.name).to.eq("hotfix/really-important");
      expect(branch.created_at).to.eq("2019-10-30 13:11:47 (Etc/UTC)");
      expect(branch.created_at_timestamp).to.eq(1572441107);
      expect(branch.created_by).to.eq(20181);
      expect(branch.created_by_email).to.eq("bodrovis@protonmail.com");
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const branch = await lokaliseApi.branches().create(
        {
          name: "hotfix/really-important",
        },
        { project_id: project_id }
      );

      expect(branch.name).to.eq("hotfix/really-important");
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const branch = await lokaliseApi.branches().update(
        branch_id,
        {
          name: "hotfix/not-really-important",
        },
        { project_id: project_id }
      );

      expect(branch.name).to.eq("hotfix/not-really-important");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApi.branches().delete(branch_id, {
        project_id: project_id,
      });

      expect(response.project_id).to.eq(project_id);
      expect(response.branch_deleted).to.be.true;
    })
    .register(this);

  cassette
    .createTest("merge", async () => {
      const branch_id_merge = 42303;
      const response = await lokaliseApi.branches().merge(
        branch_id_merge,
        { project_id: project_id },
        {
          force_conflict_resolve_using: "master",
        }
      );

      expect(response.project_id).to.eq(project_id);
      expect(response.branch_merged).to.eq(true);
      expect(response.branch.branch_id).to.eq(branch_id_merge);
    })
    .register(this);

  cassette
    .createTest("merge with defaults", async () => {
      const branch_id_merge = 68628;
      const response = await lokaliseApi.branches().merge(branch_id_merge, {
        project_id: project_id,
      });

      expect(response.project_id).to.eq(project_id);
      expect(response.branch_merged).to.eq(true);
      expect(response.branch["branch_id"]).to.eq(branch_id_merge);
    })
    .register(this);
});
