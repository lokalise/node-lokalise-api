import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api.js";

describe("UserGroups", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const team_id = 176692;
  const group_id = 7561;
  const new_group_id = 762;
  const user_id = 20181;
  const project_id = "531138705d0ba0c18f5b43.63503311";

  cassette
    .createTest("list", async () => {
      const user_groups = await lokaliseApi.userGroups().list({
        team_id: team_id,
      });
      expect(user_groups.items[1].group_id).to.eq(group_id);
      expect(user_groups.totalResults).to.eq(4);
      expect(user_groups.currentPage).to.eq(1);
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const user_groups = await lokaliseApi.userGroups().list({
        team_id: team_id,
        page: 1,
        limit: 1,
      });
      expect(user_groups.items[0].group_id).to.eq(2639);
      expect(user_groups.totalResults).to.eq(4);
      expect(user_groups.totalPages).to.eq(4);
      expect(user_groups.resultsPerPage).to.eq(1);
      expect(user_groups.currentPage).to.eq(1);
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const user_group = await lokaliseApi.userGroups().get(group_id, {
        team_id: team_id,
      });

      expect(user_group.group_id).to.eq(group_id);
      expect(user_group.name).to.eq("Restricted");
      expect(user_group.permissions.is_admin).to.be.false;
      expect(user_group.permissions.is_reviewer).to.be.true;

      const languages = user_group.permissions.languages[1];
      expect(languages.is_writable).to.be.true;
      expect(languages.lang_id).to.eq(910);
      expect(languages.lang_iso).to.eq("ak");
      expect(languages.lang_name).to.eq("Akan");

      expect(user_group.created_at).to.eq("2022-08-01 14:16:44 (Etc/UTC)");
      expect(user_group.created_at_timestamp).to.eq(1659363404);
      expect(user_group.team_id).to.eq(team_id);
      expect(user_group.projects).to.include("2273827860c1e2473eb195.11207948");
      expect(user_group.members).to.include(34051);
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const user_group = await lokaliseApi.userGroups().create(
        {
          name: "Node",
          is_reviewer: false,
          is_admin: true,
          admin_rights: ["upload"],
        },
        { team_id: team_id }
      );

      expect(user_group.group_id).to.eq(new_group_id);
      expect(user_group.name).to.eq("Node");
      expect(user_group.permissions.is_admin).to.be.true;
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const user_group = await lokaliseApi.userGroups().update(
        new_group_id,
        {
          name: "Node updated",
          is_reviewer: false,
          is_admin: true,
          admin_rights: ["upload"],
        },
        { team_id: team_id }
      );
      expect(user_group.group_id).to.eq(new_group_id);
      expect(user_group.name).to.eq("Node updated");
      expect(user_group.permissions.is_admin).to.be.true;
    })
    .register(this);

  cassette
    .createTest("add_project_to_group", async () => {
      const user_group = await lokaliseApi
        .userGroups()
        .add_projects_to_group(team_id, new_group_id, [project_id]);

      expect(user_group.group_id).to.eq(new_group_id);
      expect(user_group.projects).to.include(project_id);
    })
    .register(this);

  cassette
    .createTest("remove_project_from_group", async () => {
      const user_group = await lokaliseApi
        .userGroups()
        .remove_projects_from_group(team_id, new_group_id, [project_id]);
      expect(user_group.group_id).to.eq(new_group_id);
      expect(user_group.projects).not.to.include(project_id);
    })
    .register(this);

  cassette
    .createTest("add_members_to_group", async () => {
      const user_group = await lokaliseApi
        .userGroups()
        .add_members_to_group(team_id, new_group_id, [user_id]);

      expect(user_group.group_id).to.eq(new_group_id);
      expect(user_group.members).to.include(user_id);
    })
    .register(this);

  cassette
    .createTest("remove_members_from_group", async () => {
      const user_group = await lokaliseApi
        .userGroups()
        .remove_members_from_group(team_id, new_group_id, [user_id]);

      expect(user_group.group_id).to.eq(new_group_id);
      expect(user_group.members).not.to.include(user_id);
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApi.userGroups().delete(new_group_id, {
        team_id: team_id,
      });

      expect(response.team_id).to.eq(team_id);
      expect(response.group_deleted).to.be.true;
    })
    .register(this);
});
