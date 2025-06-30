import { describe, expect, it, LokaliseApiOta, Stub } from "../setup.js";

describe("OtaUsageStatistics", () => {
	const token = process.env.API_JWT;
	const lokaliseApiOta = new LokaliseApiOta({ apiKey: process.env.API_JWT });
	const rootUrl = lokaliseApiOta.clientData.host;
	const teamId = 176692;
	const projectId = "88628569645b945648b474.25982965";

	it("retrieves", async () => {
		const from = "2023-06-01";
		const to = "2023-08-23";
		const params = {
			dateFrom: from,
			dateTo: to,
		};

		const stub = new Stub({
			fixture: "ota_usage_statistics/retrieve.json",
			uri: `teams/${teamId}/projects/${projectId}/stats`,
			version: "v3",
			skipApiToken: true,
			rootUrl,
			query: params,
			reqHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		await stub.setStub();

		const stat = await lokaliseApiOta.otaUsageStatistics().get(params, {
			teamId: teamId,
			lokaliseProjectId: projectId,
		});

		expect(stat.lokaliseProjectId).to.eq(projectId);
		expect(stat.from).to.eq(from);
		expect(stat.to).to.eq(to);
		expect(stat.sdk).to.eq("");
		expect(stat.monthly[0].date).to.eq("2023-08-31");
		expect(stat.monthly[0].downloads).to.eq(2);
		expect(stat.daily[0].date).to.eq("2023-08-22");
		expect(stat.daily[0].trafficMb).to.eq(0);
		expect(stat.totals.trafficBytes).to.eq("3588");
	});
});
