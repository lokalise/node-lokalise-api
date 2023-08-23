import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApiOta } from "../../src/main.js";

describe("OtaUsageStatistics", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApiOta = new LokaliseApiOta({ apiKey: process.env.API_JWT });
  const teamId = 176692;
  const projectId = "963054665b7c313dd9b323.35886655";

  cassette
    .createTest("get", async () => {
      const from = "2023-06-01";
      const to = "2023-08-23";

      const stat = await lokaliseApiOta.otaUsageStatistics().get(
        {
          dateFrom: from,
          dateTo: to,
        },
        {
          teamId: teamId,
          lokaliseProjectId: projectId,
        },
      );

      expect(stat.lokaliseProjectId).to.eq(projectId);
      expect(stat.from).to.eq(from);
      expect(stat.to).to.eq(to);
      expect(stat.sdk).to.eq("");
      expect(stat.monthly[0].date).to.eq("2023-08-31");
      expect(stat.monthly[0].downloads).to.eq(2);
      expect(stat.daily[0].date).to.eq("2023-08-22");
      expect(stat.daily[0].trafficMb).to.eq(0);
      expect(stat.totals.trafficBytes).to.eq("3588");
    })
    .register(this);
});
