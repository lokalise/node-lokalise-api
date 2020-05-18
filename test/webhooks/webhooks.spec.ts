require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise";

describe("Webhooks", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "803826145ba90b42d5d860.46800099";
  const webhook_id = "795565582e5ab15a59bb68156c7e2e9eaa1e8d1a";
  const new_webhook_id = "fb60b95ff86631c9f4df2fb8f5e77ba879cf9156";

  cassette
    .createTest("list", async () => {
      const webhooks = await lokaliseApi.webhooks.list({
        project_id: project_id,
      });

      expect(webhooks[0].url).to.eq("https://serios.webhook");
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const webhooks = await lokaliseApi.webhooks.list({
        project_id: project_id,
        page: 2,
        limit: 1,
      });

      expect(webhooks[0].url).to.eq("https://canihaz.hook");
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const webhook = await lokaliseApi.webhooks.get(webhook_id, {
        project_id: project_id,
      });

      expect(webhook.webhook_id).to.eq(webhook_id);
      expect(webhook.url).to.eq("https://serios.webhook");
      expect(webhook.secret).to.eq("5efb67362d6408c43e2cc541729e07925cf636d1");
      expect(webhook.webhook_id).to.eq(webhook_id);
      expect(webhook.events[0]).to.eq("project.imported");
      expect(webhook.event_lang_map[0]["event"]).to.eq(
        "project.translation.updated"
      );
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const webhook = await lokaliseApi.webhooks.create(
        { url: "http://node.hook", events: ["project.exported"] },
        { project_id: project_id }
      );

      expect(webhook.webhook_id).to.eq(new_webhook_id);
      expect(webhook.url).to.eq("http://node.hook");
      expect(webhook.events[0]).to.eq("project.exported");
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const webhook = await lokaliseApi.webhooks.update(
        new_webhook_id,
        { url: "http://hook.node", events: ["project.snapshot"] },
        { project_id: project_id }
      );

      expect(webhook.webhook_id).to.eq(new_webhook_id);
      expect(webhook.url).to.eq("http://hook.node");
      expect(webhook.events[0]).to.eq("project.snapshot");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApi.webhooks.delete(new_webhook_id, {
        project_id: project_id,
      });

      expect(response.project_id).to.eq(project_id);
      expect(response.webhook_deleted).to.eq(true);
    })
    .register(this);

  cassette
    .createTest("regenerate_secret", async () => {
      const response = await lokaliseApi.webhooks.regenerate_secret(
        "795565582e5ab15a59bb68156c7e2e9eaa1e8d1a",
        { project_id: project_id }
      );

      expect(response.project_id).to.eq(project_id);
      expect(response.secret).to.eq("8c91d28b46a8874c7ef0064494587b83944675ab");
    })
    .register(this);
});
