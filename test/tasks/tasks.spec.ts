require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise";

describe("Tasks", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "803826145ba90b42d5d860.46800099";
  const task_id = 11925;
  const new_task_id = 15526;

  cassette
    .createTest("list", async () => {
      const tasks = await lokaliseApi.tasks.list({ project_id: project_id });

      expect(tasks.items[0].task_id).to.eq(task_id);
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const tasks = await lokaliseApi.tasks.list({
        project_id: project_id,
        page: 2,
        limit: 1,
      });

      expect(tasks.items[0].task_id).to.eq(10001);
      expect(tasks.totalResults).to.eq(3);
      expect(tasks.totalPages).to.eq(3);
      expect(tasks.resultsPerPage).to.eq(1);
      expect(tasks.currentPage).to.eq(2);
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const task = await lokaliseApi.tasks.get(task_id, {
        project_id: project_id,
      });

      expect(task.task_id).to.eq(task_id);
      expect(task.title).to.eq("node updated");
      expect(task.can_be_parent).be.false;
      expect(task.task_type).to.eq("review");
      expect(task.parent_task_id).to.be.null;
      expect(task.closing_tags).to.have.lengthOf(0);
      expect(task.description).to.eq("");
      expect(task.status).to.eq("completed");
      expect(task.progress).to.eq(0);
      expect(task.due_date).to.be.null;
      expect(task.due_date_timestamp).to.be.null;
      expect(task.keys_count).to.eq(16);
      expect(task.words_count).to.eq(275);
      expect(task.created_at).to.eq("2019-05-13 16:15:26 (Etc/UTC)");
      expect(task.created_at_timestamp).to.eq(1557764126);
      expect(task.created_by).to.eq(20181);
      expect(task.created_by_email).to.eq("bodrovis@protonmail.com");
      expect(task.source_language_iso).to.eq("en");
      expect(task.languages[0].language_iso).to.eq("sq");
      expect(task.auto_close_languages).to.be.true;
      expect(task.auto_close_task).to.be.true;
      expect(task.auto_close_items).to.be.true;
      expect(task.completed_at).to.eq("2019-10-01 11:09:12 (Etc/UTC)");
      expect(task.completed_at_timestamp).to.eq(1569928152);
      expect(task.completed_by).to.eq(20181);
      expect(task.completed_by_email).to.eq("bodrovis@protonmail.com");
      expect(task.do_lock_translations).to.be.false;
      expect(task.custom_translation_status_ids).to.have.lengthOf(0);
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const task = await lokaliseApi.tasks.create(
        {
          title: "node task",
          keys: [15519786],
          languages: [
            {
              language_iso: "en",
              users: [20181],
            },
          ],
        },
        { project_id: project_id }
      );

      expect(task.task_id).to.eq(new_task_id);
      expect(task.title).to.eq("node task");
      expect(task.languages[0].language_iso).to.eq("en");
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const task = await lokaliseApi.tasks.update(
        task_id,
        { title: "node updated" },
        { project_id: project_id }
      );

      expect(task.title).to.eq("node updated");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApi.tasks.delete(new_task_id, {
        project_id: project_id,
      });

      expect(response.project_id).to.eq(project_id);
      expect(response.task_deleted).to.be.true;
    })
    .register(this);
});
