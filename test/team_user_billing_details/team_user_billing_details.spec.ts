import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api.js";

describe("Team user billing details", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });

  cassette
    .createTest("get", async () => {
      const details = await lokaliseApi.teamUserBillingDetails().get(176692);

      expect(details.company).to.eq("Self-employed");
      expect(details.address1).to.eq("Sample line 1");
      expect(details.address2).to.eq("Sample line 2");
      expect(details.city).to.eq("Riga");
      expect(details.zip).to.eq("LV-6543");
      expect(details.phone).to.eq("+371123456");
      expect(details.vatnumber).to.eq("123");
      expect(details.country_code).to.eq("LV");
      expect(details.billing_email).to.eq("hello@example.com");
      expect(details.state_code).to.eq("");
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const details = await lokaliseApi.teamUserBillingDetails().create(
        {
          billing_email: "hello@example.com",
          country_code: "LV",
          zip: "LV-1234",
        },
        { team_id: 199048 }
      );

      expect(details.billing_email).to.eq("hello@example.com");
      expect(details.country_code).to.eq("LV");
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const details = await lokaliseApi
        .teamUserBillingDetails()
        .update(199048, {
          vatnumber: "123",
          address1: "Line 1",
          address2: "Line 2",
          country_code: "LV",
          billing_email: "updated@example.com",
          zip: "LV-1234",
        });

      expect(details.billing_email).to.eq("updated@example.com");
      expect(details.country_code).to.eq("LV");
      expect(details.address2).to.eq("Line 2");
    })
    .register(this);
});
