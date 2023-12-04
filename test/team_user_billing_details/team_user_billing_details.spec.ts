import { LokaliseApi, Stub, expect, it, describe } from "../setup.js";

describe("Team user billing details", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const teamId = 176692;

  it("retrieves", async function () {
    const stub = new Stub({
      fixture: "team_user_billing_details/retrieve.json",
      uri: `teams/${teamId}/billing_details`,
    });

    await stub.setStub();

    const details = await lokaliseApi.teamUserBillingDetails().get(teamId);

    expect(details.company).to.eq("");
    expect(details.address1).to.eq("");
    expect(details.address2).to.eq("");
    expect(details.city).to.eq("");
    expect(details.zip).to.eq("LV-1234");
    expect(details.phone).to.eq("");
    expect(details.vatnumber).to.eq(null);
    expect(details.country_code).to.eq("LV");
    expect(details.billing_email).to.eq("hi2@lokalise.com");
    expect(details.state_code).to.eq("");
  });

  it("creates", async function () {
    const params = {
      billing_email: "hello@example.com",
      country_code: "LV",
      zip: "LV-1234",
    };

    const stub = new Stub({
      fixture: "team_user_billing_details/create.json",
      uri: `teams/${teamId}/billing_details`,
      method: "POST",
      body: params,
    });

    await stub.setStub();

    const details = await lokaliseApi
      .teamUserBillingDetails()
      .create(params, { team_id: teamId });

    expect(details.billing_email).to.eq("hello@example.com");
    expect(details.country_code).to.eq("LV");
  });

  it("updates", async function () {
    const params = {
      vatnumber: "123",
      address1: "Line 1",
      address2: "Line 2",
      country_code: "LV",
      billing_email: "updated@example.com",
      zip: "LV-1234",
    };

    const stub = new Stub({
      fixture: "team_user_billing_details/update.json",
      uri: `teams/${teamId}/billing_details`,
      method: "PUT",
      body: params,
    });

    await stub.setStub();

    const details = await lokaliseApi
      .teamUserBillingDetails()
      .update(teamId, params);

    expect(details.billing_email).to.eq("updated@example.com");
    expect(details.country_code).to.eq("LV");
    expect(details.address2).to.eq("Line 2");
  });
});
