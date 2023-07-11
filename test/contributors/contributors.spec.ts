import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api.js";

describe("Contributors", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "803826145ba90b42d5d860.46800099";
  const user_id = 20181;
  const new_user_id = 39938;

  cassette
    .createTest("list", async () => {
      const contributors = await lokaliseApi.contributors().list({
        project_id: project_id,
      });

      expect(contributors.items[0].user_id).to.eq(user_id);
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const contributors = await lokaliseApi.contributors().list({
        project_id: project_id,
        page: 2,
        limit: 3,
      });

      expect(contributors.items[0].user_id).to.eq(33599);
      expect(contributors.totalResults).to.eq(8);
      expect(contributors.totalPages).to.eq(3);
      expect(contributors.resultsPerPage).to.eq(3);
      expect(contributors.currentPage).to.eq(2);
      expect(contributors.isFirstPage()).to.be.false;
      expect(contributors.isLastPage()).to.be.false;
      expect(contributors.nextPage()).to.eq(3);
      expect(contributors.prevPage()).to.eq(1);
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const contributor = await lokaliseApi.contributors().get(user_id, {
        project_id: project_id,
      });

      expect(contributor.user_id).to.eq(user_id);
      expect(contributor.email).to.eq("bodrovis@protonmail.com");
      expect(contributor.fullname).to.eq("Ilya B");
      expect(contributor.created_at).to.eq("2018-08-21 15:35:25 (Etc/UTC)");
      expect(contributor.created_at_timestamp).to.eq(1534865725);
      expect(contributor.is_admin).to.be.true;
      expect(contributor.is_reviewer).to.be.true;
      expect(contributor.languages[0].lang_id).to.eq(803);
      expect(contributor.languages[0].lang_iso).to.eq("sq");
      expect(contributor.admin_rights).to.include("upload");
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const contributors = await lokaliseApi.contributors().create(
        [
          {
            email: "translator2@mycompany.com",
            fullname: "Mr. Translator",
            is_admin: false,
            is_reviewer: true,
            languages: [
              {
                lang_iso: "en",
                is_writable: false,
              },
              {
                lang_iso: "ru",
                is_writable: true,
              },
            ],
          },
        ],
        { project_id: project_id },
      );

      expect(contributors[0].email).to.eq("translator2@mycompany.com");
      expect(contributors[0].user_id).to.eq(new_user_id);
    })
    .register(this);

  cassette
    .createTest("create_single", async () => {
      const contributors = await lokaliseApi.contributors().create(
        {
          email: "translator3@mycompany.com",
          fullname: "Mr. Translator Single",
          is_admin: false,
          is_reviewer: true,
          languages: [
            {
              lang_iso: "en",
              is_writable: false,
            },
          ],
        },
        { project_id: project_id },
      );

      expect(contributors[0].email).to.eq("translator3@mycompany.com");
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const contributor = await lokaliseApi
        .contributors()
        .update(new_user_id, { is_admin: true }, { project_id: project_id });

      expect(contributor.user_id).to.eq(new_user_id);
      expect(contributor.is_admin).to.be.true;
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApi.contributors().delete(new_user_id, {
        project_id: project_id,
      });

      expect(response.project_id).to.eq(project_id);
      expect(response.contributor_deleted).to.be.true;
    })
    .register(this);
});
